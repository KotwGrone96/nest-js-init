import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
	@InjectRepository(User)
	private userRepository: Repository<User>;

	findOne(id: string) {
		return 'Devuelve un usuario con id: ' + id;
	}

	findAll() {
		return 'Devuelve todos los usuarios';
	}

	async create(user: UserDto) {
		const { username, password, person_id, rolname } = user;
		const hashPass = await hash(password, 10);
		const newUser = new User();
		newUser.username = username;
		newUser.password = hashPass;
		newUser.person_id = person_id;
		newUser.rolname = rolname;
		try {
			await this.userRepository.save(newUser);
			return true;
		} catch (error) {
			return false;
		}
	}

	update(id: string) {
		return 'Actualiza los datos de un usuario con id: ' + id;
	}

	delete(id: string) {
		return 'Elimina un usuario con id: ' + id;
	}
}
