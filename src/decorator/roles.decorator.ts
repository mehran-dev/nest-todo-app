import { SetMetadata } from '@nestjs/common';

export type UserType = string | ['user', 'admin', 'reporter'];

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
