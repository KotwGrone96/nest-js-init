import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Person } from './person/person.entity';
import { User } from './user/user.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { AuthModule } from './auth/auth.module';
import { RoleGuard } from './role/role.guard';
import { AuthGuard } from './auth/auth.guard';
import { Store } from './store/store.entity';
import { StoreModule } from './store/store.module';
import { Provider } from './provider/provider.entity';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';
import { ProviderModule } from './provider/provider.module';
import { ProductModule } from './product/product.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			entities: [Person, User, Role, Store, Provider, Product, Category],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([Person, User]),
		PersonModule,
		UserModule,
		RoleModule,
		AuthModule,
		StoreModule,
		ProviderModule,
		ProductModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RoleGuard,
		},
	],
})
export class AppModule {}
