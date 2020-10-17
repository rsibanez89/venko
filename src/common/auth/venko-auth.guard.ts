import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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

    // Attach the email to the request object
    const email = decoded['https://api.venko.training/email'];
    request['email'] = email;

    // 1- Check if user is Venko Admin:
    const roles: string[] = decoded['https://api.venko.training/roles'];
    const isAdmin =
      roles != null && roles.length > 0 && roles.indexOf('Admin') !== -1;
    request['isAdmin'] = isAdmin;
    if (isAdmin) {
      return true;
    }

    // 2- Check if user has Permission:
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    // The token has all the required permissions.
    const validPermissions = hasPermission(
      decoded?.permissions,
      requiredPermissions,
    );
    if (validPermissions) {
      return true;
    }

    // 3- Check if the user is the owner of the resource.
    const resourceOwner = (request.body || {} as any).email
    if(email == resourceOwner) {
      return true;
    }

    return false;
  }
}
