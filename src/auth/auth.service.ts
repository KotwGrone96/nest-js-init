import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	@InjectRepository(User)
	private userRepository: Repository<User>;

	async login(user: UserDto) {
		const { username, password } = user;
		const existUsername = await this.userRepository.findOneBy({
			username,
			deleted_at: null,
		});
		if (!existUsername) {
			return {
				ok: false,
				message: 'El nombre de usuario no existe',
			};
		}
		const samePass = await compare(password, existUsername.password);
		if (!samePass) {
			return {
				ok: false,
				message: 'La contraseña no es válida',
			};
		}

		const { id, rolname } = existUsername;

		const payload = { id, rolname, username };

		const token = await this.jwtService.signAsync(payload, {
			secret: process.env.JWT_SECRET,
		});

		return {
			ok: true,
			message: 'Usuario encontrado',
			token: `${process.env.BEARER_KEY} ${token}`,
		};
	}
}
