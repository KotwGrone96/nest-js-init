import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
} from '@nestjs/common';
import { Role } from 'src/decorators/role.decorator';
import { StoreService } from './store.service';
import StoreDto from './store.dto';

@Controller('store')
export class StoreController {
	constructor(private storeService: StoreService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.storeService.findOne(id);
	}

	@Get('all')
	findAll() {
		return this.storeService.findAll();
	}

	@Post('create')
	@Role('ADMIN', 'SUPERADMIN')
	create(@Body() storeDto: StoreDto) {
		return this.storeService.create(storeDto);
	}

	@Put('update')
	@Role('ADMIN', 'SUPERADMIN')
	update(@Body() storeDto: StoreDto) {
		return this.storeService.update(storeDto);
	}

	@Delete(':id')
	@Role('ADMIN', 'SUPERADMIN')
	delete(@Param('id') id: string) {
		return this.storeService.delete(id);
	}
}
