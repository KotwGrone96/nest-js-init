import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([Person]), UserModule],
	controllers: [PersonController],
	providers: [PersonService],
	exports: [PersonService],
})
export class PersonModule {}
