import {
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import { Provider } from 'src/provider/provider.entity';

@Entity()
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	private_price: string;

	@Column()
	profit: string;

	@Column()
	public_price: string;

	@Column({ nullable: true })
	category_id: string;

	@ManyToOne(() => Provider, (provider) => provider.products)
	@JoinColumn({ name: 'provider_id' })
	provider: Provider;

	@Column()
	stock: number;

	@Column()
	description: string;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deleted_at: Date;
}
