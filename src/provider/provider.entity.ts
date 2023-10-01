import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	Column,
	OneToMany,
} from 'typeorm';

import { Product } from 'src/product/product.entity';

@Entity()
export class Provider {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	name: string;

	@Column({ nullable: true })
	address: string;

	@Column({ nullable: true })
	secondary_address: string;

	@Column({ nullable: true })
	phone: string;

	@Column({ nullable: true })
	secondary_phone: string;

	@Column({ nullable: true })
	email: string;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deleted_at: Date;

	@OneToMany(() => Product, (product) => product.provider)
	products: Product[];
}
