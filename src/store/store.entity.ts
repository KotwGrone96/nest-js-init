import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Store {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	name: string;

	@Column()
	address: string;

	@Column()
	city: string;

	@Column()
	province: string;

	@Column({ nullable: true })
	identifier: string;

	@Column()
	owner: string;

	@Column({ nullable: true })
	phone: string;

	@Column({ nullable: true })
	description: string;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deleted_at: Date;
}
