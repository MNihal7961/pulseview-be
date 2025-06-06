import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jswt-auth.guard';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	const reflector = app.get(Reflector);
	app.useGlobalGuards(new JwtAuthGuard(reflector));
	await app.listen(3000);
}
bootstrap();
