import { IsNotEmpty } from 'class-validator';

export default class ProductDto {
	id?: string;

	@IsNotEmpty({ message: 'Nombre de producto requerido' })
	name: string;

	@IsNotEmpty({ message: 'Valor de compra requerido' })
	private_price: string;

	@IsNotEmpty({ message: 'Porcentaje de ganancia requerido' })
	profit: string;

	@IsNotEmpty({ message: 'Precio al público requerido' })
	public_price: string;

	category_id: string;

	@IsNotEmpty({ message: 'Proveedor requerido' })
	provider_id: string;

	@IsNotEmpty({ message: 'Stock requerido' })
	stock: number;

	@IsNotEmpty({ message: 'Descripción requerido' })
	description: string;

	created_at?: Date;

	updated_at?: Date;

	deleted_at?: Date;
}
