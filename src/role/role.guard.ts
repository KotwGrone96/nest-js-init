import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { ROLE } from './role.enum';

interface payload {
	id: string;
	rolname: string;
	username: string;
}

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext) {
		const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles) {
			return true;
		}
		const request = context.switchToHttp().getRequest() as Request;
		const user = request['user'] as payload;

		if (user.rolname === ROLE.SUPERADMIN) {
			return true;
		}

		return requiredRoles.some((role) => user.rolname.includes(role));
	}
}
