import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Role = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);