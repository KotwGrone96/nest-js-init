import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'product_categories' })
export class Category {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deleted_at: Date;
}
