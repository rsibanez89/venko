import { SetMetadata } from '@nestjs/common';

export const Permissions = (...args: string[]) =>
  SetMetadata('permissions', args);

export function hasPermission(userPermissions: string[], requiredPermissions: string[]) {
  if (requiredPermissions == null || requiredPermissions.length <= 0) {
    return true;
  }

  if (userPermissions == null || userPermissions.length <= 0) {
    return false;
  }

  return requiredPermissions.every(routePermission =>
    userPermissions.includes(routePermission),
  );
}
  
