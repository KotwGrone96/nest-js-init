import { IsNotEmpty } from 'class-validator';

export default class StoreDto {
	id?: string;

	@IsNotEmpty({ message: 'Nombre de la tienda requerido' })
	name: string;

	@IsNotEmpty({ message: 'Dirección de la tienda requerido' })
	address: string;

	@IsNotEmpty({ message: 'Ciudad de la tienda requerido' })
	city: string;

	@IsNotEmpty({ message: 'Provincia de la tienda requerido' })
	province: string;

	identifier?: string;

	@IsNotEmpty({ message: 'Especifique el dueño/a de la tienda' })
	owner: string;

	phone?: string;

	description?: string;

	created_at?: Date;

	updated_at?: Date;

	deleted_at?: Date;
}
