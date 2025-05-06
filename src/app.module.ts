import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WeightEntriesModule } from './weight-entries/weight-entries.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { MedicationsModule } from './medications/medications.module';

@Module({
  imports: [
    AuthModule,
    WeightEntriesModule,
    ShipmentsModule,
    MedicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
