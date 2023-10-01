import { Product } from 'src/product/product.entity';

export default class ProviderDto {
	id?: string;

	name: string;

	address?: string;

	secondary_address?: string;

	phone?: string;

	secondary_phone?: string;

	email?: string;

	created_at?: Date;

	updated_at?: Date;

	deleted_at?: Date;

	products?: Product[];
}
