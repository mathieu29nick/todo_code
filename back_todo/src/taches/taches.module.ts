import { Module } from '@nestjs/common';
import { TachesController } from './taches.controller';
import { TachesService } from './taches.service';
import { Taches } from './taches.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Taches])
  ],
  controllers: [TachesController],
  providers: [TachesService]
})
export class TachesModule {}
