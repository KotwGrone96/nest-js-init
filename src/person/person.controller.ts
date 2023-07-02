import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonDto } from './person.dto';
import { Role } from 'src/decorators/role.decorator';

@Controller('person')
export class PersonController {
	constructor(private personService: PersonService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.personService.findOne(id);
	}

	@Role('ADMIN', 'SUPERVISOR')
	@Get()
	findAll() {
		return this.personService.findAll();
	}

	@Role('ADMIN')
	@Post()
	create(@Body() personDto: PersonDto) {
		return this.personService.create(personDto);
	}

	@Role('ADMIN')
	@Put(':id')
	update(@Param('id') id: string) {
		return this.personService.update(id);
	}

	@Role('ADMIN')
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.personService.delete(id);
	}
}
