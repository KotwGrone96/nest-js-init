import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

const port = process.env.PORT || 5000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				return new BadRequestException(
					validationErrors.map((error) => ({
						field: error.property,
						error: Object.values(error.constraints).join(', '),
					})),
				);
			},
		}),
	);
	await app.listen(port);
}
bootstrap();
