import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagazineService } from './magazine.service';
import { MagazineController } from './magazine.controller';
import { Magazine } from './magazine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Magazine])],
  providers: [MagazineService],
  controllers: [MagazineController]
})
export class MagazineModule {}
