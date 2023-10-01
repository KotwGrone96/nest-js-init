import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductDto from './product.dto';
import { ProviderService } from 'src/provider/provider.service';

@Injectable()
export class ProductService {
	constructor(private providerService: ProviderService) {}

	@InjectRepository(Product)
	private productRepository: Repository<Product>;

	async findAll() {
		try {
			const products = await this.productRepository.find({
				where: { deleted_at: null },
				relations: { provider: true },
			});

			return {
				ok: true,
				message: 'Todos los productos',
				products,
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async findOne(id: string) {
		try {
			const product = await this.productRepository.findOne({
				where: { id, deleted_at: null },
				relations: { provider: true },
			});
			if (!product) {
				return {
					ok: false,
					message: 'No se encontró producto',
				};
			}
			return {
				ok: true,
				message: 'Producto encontrado',
				product,
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async create(product: ProductDto) {
		const {
			name,
			private_price,
			profit,
			public_price,
			stock,
			provider_id,
			category_id,
			description,
		} = product;

		try {
			const provider = await this.providerService.findOne(provider_id);

			if (!provider.ok) {
				return provider;
			}

			const new_product = new Product();
			new_product.name = name;
			new_product.private_price = private_price;
			new_product.profit = profit;
			new_product.public_price = public_price;
			new_product.stock = stock;
			new_product.category_id = category_id;
			new_product.description = description;
			new_product.provider = provider.provider;

			await this.productRepository.save(new_product);

			return {
				ok: true,
				message: 'Producto creado',
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async update(product: ProductDto) {
		const {
			id,
			name,
			private_price,
			profit,
			public_price,
			stock,
			provider_id,
			category_id,
			description,
		} = product;

		try {
			const current_product = await this.findOne(id);

			if (!current_product.ok) {
				return current_product;
			}

			const provider = await this.providerService.findOne(provider_id);

			if (!provider.ok) {
				return provider;
			}

			const new_product = new Product();
			new_product.name = name;
			new_product.private_price = private_price;
			new_product.profit = profit;
			new_product.public_price = public_price;
			new_product.stock = stock;
			new_product.category_id = category_id;
			new_product.description = description;
			new_product.provider = provider.provider;

			await this.productRepository.save(new_product);

			return {
				ok: true,
				message: 'Producto actualizado',
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async delete(id: string) {
		try {
			const product = await this.productRepository.findOne({
				where: { id, deleted_at: null },
			});
			if (!product) {
				return {
					ok: false,
					message: 'Producto no encontrado',
				};
			}

			await this.productRepository.softDelete(id);
			return {
				ok: true,
				message: 'Producto eliminada',
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}
}
