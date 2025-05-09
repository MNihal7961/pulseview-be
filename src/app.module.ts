import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WeightEntriesModule } from './weight-entries/weight-entries.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { MedicationsModule } from './medications/medications.module';
import { User } from './auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GoalsModule } from './goals/goals.module';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const secret = configService.get<string>('AUTH_SECRET');
				return { secret };
			},
			inject: [ConfigService],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'mongodb',
				url: configService.get('DB_URL'),
				entities: [User],
				synchronize: true,
				autoLoadEntities: true,
			}),
			inject: [ConfigService],
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		WeightEntriesModule,
		ShipmentsModule,
		MedicationsModule,
		GoalsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
