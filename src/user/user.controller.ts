import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { Role } from 'src/decorators/role.decorator';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Role('ADMIN', 'SUPERVISOR')
	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Role('ADMIN')
	@Post('create')
	create(@Body() userDto: UserDto) {
		return this.userService.create(userDto);
	}

	@Role('ADMIN')
	@Put(':id')
	update(@Param('id') id: string) {
		return this.userService.update(id);
	}

	@Role('ADMIN')
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.userService.delete(id);
	}
}
