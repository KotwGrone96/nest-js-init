import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import StoreDto from './store.dto';

@Injectable()
export class StoreService {
	@InjectRepository(Store)
	private storeRepository: Repository<Store>;

	async findOne(id: string) {
		try {
			const store = await this.storeRepository.findOne({
				where: { id, deleted_at: null },
			});
			if (!store) {
				return {
					ok: false,
					message: 'No se encontró tienda',
				};
			}
			return {
				ok: true,
				message: 'Tienda encontrada',
				store,
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async findAll() {
		try {
			const stores = await this.storeRepository.find({
				where: { deleted_at: null },
			});
			return {
				ok: true,
				message: 'Lista de tiendas',
				stores,
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async create(store: StoreDto) {
		const {
			name,
			address,
			city,
			province,
			owner,
			identifier,
			phone,
			description,
		} = store;
		try {
			const new_store = new Store();
			new_store.name = name;
			new_store.address = address;
			new_store.city = city;
			new_store.province = province;
			new_store.owner = owner;
			new_store.identifier = identifier;
			new_store.phone = phone;
			new_store.description = description;

			await this.storeRepository.save(new_store);

			return {
				ok: true,
				message: 'Tienda creada',
			};
		} catch (error) {
			return {
				ok: false,
				message: 'Ha ocurrido un error en el servidor',
				error,
			};
		}
	}

	async update(store: StoreDto) {
		const {
			id,
			name,
			address,
			city,
			province,
			owner,
			identifier,
			phone,
			description,
		} = store;
		try {
			const current_store = await this.storeRepository.findOne({
				where: { id, deleted_at: null },
			});

			if (!current_store) {
				return {
					ok: false,
					message: 'No se encontró tienda',
				};
			}

			current_store.name = name;
			current_store.address = address;
			current_store.city = city;
			current_store.province = province;
			current_store.owner = owner;
			current_store.identifier = identifier;
			current_store.phone = phone;
			current_store.description = description;

			await this.storeRepository.save(current_store);

			return {
				ok: true,
				message: 'Tienda actualizada',
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
			const store = await this.storeRepository.findOne({
				where: { id, deleted_at: null },
			});
			if (!store) {
				return {
					ok: false,
					message: 'No se encontró tienda',
				};
			}

			await this.storeRepository.softDelete(id);
			return {
				ok: true,
				message: 'Tienda eliminada',
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
