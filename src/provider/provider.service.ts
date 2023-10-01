import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import ProviderDto from './provider.dto';

@Injectable()
export class ProviderService {
	@InjectRepository(Provider)
	private providerRepository: Repository<Provider>;

	async findAll() {
		try {
			const providers = await this.providerRepository.find({
				where: { deleted_at: null },
				relations: { products: true },
			});

			return {
				ok: true,
				message: 'Todos los proveedores',
				providers,
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
			const provider = await this.providerRepository.findOne({
				where: { id, deleted_at: null },
				relations: { products: true },
			});
			if (!provider) {
				return {
					ok: false,
					message: 'No se encontró proveedor',
				};
			}
			return {
				ok: true,
				message: 'Se encontró proveedor',
				provider,
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async create(provider: ProviderDto) {
		const { name, address, secondary_address, phone, secondary_phone, email } =
			provider;
		try {
			const new_provider = new Provider();
			new_provider.name = name;
			new_provider.address = address;
			new_provider.secondary_address = secondary_address;
			new_provider.phone = phone;
			new_provider.secondary_phone = secondary_phone;
			new_provider.email = email;

			await this.providerRepository.save(new_provider);

			return {
				ok: true,
				message: 'Proveedor creado',
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async update(provider: ProviderDto) {
		const {
			id,
			name,
			address,
			secondary_address,
			phone,
			secondary_phone,
			email,
		} = provider;
		try {
			const current_provider = await this.providerRepository.findOne({
				where: { id, deleted_at: null },
			});
			if (!current_provider) {
				return {
					ok: false,
					message: 'No se encontró proveedor',
				};
			}
			current_provider.name = name;
			current_provider.address = address;
			current_provider.secondary_address = secondary_address;
			current_provider.phone = phone;
			current_provider.secondary_phone = secondary_phone;
			current_provider.email = email;

			await this.providerRepository.save(current_provider);

			return {
				ok: true,
				message: 'Proveedor actualizado',
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
			const provider = await this.providerRepository.findOne({
				where: { id, deleted_at: null },
			});
			if (!provider) {
				return {
					ok: false,
					message: 'No se encontró proveedor',
				};
			}

			await this.providerRepository.softDelete(id);

			return {
				ok: true,
				message: 'Proveedor eliminado',
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
