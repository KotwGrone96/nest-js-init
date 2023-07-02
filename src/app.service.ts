import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from './person/person.entity';
import { User } from './user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class AppService {
	@InjectRepository(Person)
	private personRepository: Repository<Person>;

	@InjectRepository(User)
	private userRepository: Repository<User>;

	getHello(): string {
		return 'Hello World!';
	}

	async createSuperAdmin() {
		const name = 'Nelson';
		const lastname = 'Gamero';
		const email = 'superadmin@storemanager.com';
		const dni = '77280515';

		const existEmail = await this.personRepository.findOneBy({
			email,
			deleted_at: null,
		});

		const existDNI = await this.personRepository.findOneBy({
			dni,
			deleted_at: null,
		});

		if (existDNI || existEmail) {
			return 'Ya existe un Super Admin';
		}
		const person = new Person();
		person.name = name;
		person.lastname = lastname;
		person.email = email;
		person.dni = dni;
		await this.personRepository.save(person);

		const hashPass = await hash(person.dni, 10);

		const user = new User();
		user.username = person.email;
		user.password = hashPass;
		user.person_id = person;
		user.rolname = 'SUPERADMIN';
		await this.userRepository.save(user);

		return 'Super Admin Creado';
	}
}
