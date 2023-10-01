import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get('all')
	findAll() {
		return this.productService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(id);
	}
}
