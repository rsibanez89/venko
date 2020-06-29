import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { hasPermission } from './permissions.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class VenkoAuthGuard implements CanActivate {
  // This guard verifies the user has the right permissions.

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers['authorization'];

    const token = authorization.replace('Bearer ', '').replace('bearer ', '');
    const decoded = jwt.decode(token) as any;

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    // The token has all the required permissions.
    const validPermissions = hasPermission(decoded?.permissions, requiredPermissions);

    // Attach the email to the request object
    request['email'] = decoded['https://api.venko.training/email'];
    
    return validPermissions;
  }
}
