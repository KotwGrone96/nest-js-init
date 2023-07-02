import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/role/role.enum';

export const ROLES_KEY = 'roles';
export const Role = (...role: Array<keyof typeof ROLE>) =>
	SetMetadata(ROLES_KEY, role);
