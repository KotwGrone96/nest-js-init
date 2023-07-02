import { IsNotEmpty, IsEmail, IsIn } from 'class-validator';
import { ROLE } from 'src/role/role.enum';

export class PersonDto {
	id?: string;

	@IsNotEmpty({ message: 'El campo es requerido' })
	name: string;

	@IsNotEmpty({ message: 'El campo es requerido' })
	lastname: string;

	@IsNotEmpty({ message: 'El campo es requerido' })
	dni: string;

	@IsNotEmpty({ message: 'El campo es requerido' })
	@IsEmail({}, { message: 'El email no es válido' })
	email: string;

	phone: string;

	@IsNotEmpty({ message: 'El campo es requerido' })
	@IsIn([ROLE.SUPERADMIN, ROLE.ADMIN, ROLE.SUPERVISOR, ROLE.USER], {
		message: 'El rol no es válido',
	})
	rolname?: string;
}
