import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/images/images.module';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandEntity } from './entities/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BrandEntity]),
    ImagesModule
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
