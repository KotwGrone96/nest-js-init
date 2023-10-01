import {
	Controller,
	Param,
	Get,
	Post,
	Put,
	Delete,
	Body,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import ProviderDto from './provider.dto';

@Controller('provider')
export class ProviderController {
	constructor(private providerService: ProviderService) {}

	@Get('all')
	findAll() {
		return this.providerService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.providerService.findOne(id);
	}

	@Post('create')
	create(@Body() providerDto: ProviderDto) {
		return this.providerService.create(providerDto);
	}

	@Put('update')
	update(@Body() providerDto: ProviderDto) {
		return this.providerService.update(providerDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.providerService.delete(id);
	}
}
