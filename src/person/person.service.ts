import { Injectable } from '@nestjs/common';
import { PersonDto } from './person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PersonService {
	constructor(private userService: UserService) {}

	@InjectRepository(Person)
	private personRepository: Repository<Person>;

	findOne(id: string) {
		return 'Devuelve una persona con id: ' + id;
	}

	findAll() {
		return 'Devuelve todas personas';
	}

	async create(person: PersonDto) {
		const { name, lastname, email, dni, phone, rolname } = person;
		const existEmail = await this.personRepository.findOneBy({
			email,
			deleted_at: null,
		});
		if (existEmail) {
			return {
				ok: false,
				message: 'El e-mail ya existe en la plataforma',
			};
		}
		const existDNI = await this.personRepository.findOneBy({
			dni,
			deleted_at: null,
		});
		if (existDNI) {
			return {
				ok: false,
				message: 'El DNI ya existe en la plataforma',
			};
		}
		const newPerson = new Person();
		newPerson.name = name;
		newPerson.lastname = lastname;
		newPerson.email = email;
		newPerson.dni = dni;
		newPerson.phone = phone;

		try {
			await this.personRepository.save(newPerson);
			const user = {
				username: email,
				password: dni,
				person_id: newPerson,
				rolname,
			};
			const newUser = await this.userService.create(user);
			if (!newUser) {
				throw new Error('Error al crear el usuario');
			}
			return {
				ok: true,
				message: 'Usuario creado',
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	update(id: string) {
		return 'Actualiza los datos de una persona con id: ' + id;
	}

	delete(id: string) {
		return 'Elimina una persona con id: ' + id;
	}
}
