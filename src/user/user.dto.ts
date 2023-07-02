import { Person } from 'src/person/person.entity';

export class UserDto {
	id?: string;
	username: string;
	password: string;
	person_id: Person;
	rolname: string;
}
