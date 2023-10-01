import { Person } from 'src/person/person.entity';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
	id?: string;

	@IsNotEmpty({ message: 'El campo es requerido' })
	username: string;

	@IsNotEmpty({ message: 'El campo es requerido' })
	password: string;

	person_id: Person;
	rolname: string;
}
