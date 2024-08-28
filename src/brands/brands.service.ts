import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Status } from 'src/utility/common/brands/brand-status.enum';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntity } from './entities/brand.entity';
import { CreateBrandResponse, ListBrandResponse } from './types/response';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandsRepository: Repository<BrandEntity>,
  ) { }

  async create(createBrandDto: CreateBrandDto, currentUser: UserEntity): Promise<CreateBrandResponse> {
    try {
      const { parentId, name, description } = createBrandDto;

      const parentBrand = parentId ? await this.findById(parentId) : null;

      const newBrand = {
        name,
        description,
        parent: parentBrand
      }

      const brand = await this.brandsRepository.create(newBrand);

      brand.addedBy = currentUser;

      const resultCreateBrand = await this.brandsRepository.save(brand);

      return {
        error: false,
        data: resultCreateBrand
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<BrandEntity> {
    const resultFindCategory = await this.brandsRepository.findOneBy({ id });
    return resultFindCategory;
  }

  async findAll(): Promise<ListBrandResponse> {
    try {
      const listBrand = await this.brandsRepository.findBy({ status: Status.ACTIVE });

      return {
        error: false,
        data: listBrand
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getListBrandAndChild(): Promise<ListBrandResponse> {
    try {
      const STATUS_FILTER = Status.ACTIVE;

      const listBrandAndChild = await this.brandsRepository
        .createQueryBuilder('brand')
        .select('parentBrand.id', 'parentId')
        .addSelect('parentBrand.name', 'parentName')
        .addSelect('parentBrand.description', 'parentDescription')
        .addSelect('parentBrand.status', 'parentStatus')
        .addSelect(`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', brand.id,
              'description', brand.description,
              'name', brand.name
            )
          )  
        `, 'brandsChild')
        .leftJoin('brand.parent', 'parentBrand')
        .where('parentBrand.id IS NOT NULL')
        .andWhere('brand.status = :STATUS_FILTER', { STATUS_FILTER })
        .andWhere('parentBrand.status = :STATUS_FILTER', { STATUS_FILTER })
        .groupBy('parentBrand.id')
        .getRawMany()

      const idsBrandParent = listBrandAndChild.map(brandItem => brandItem.parentId);

      const queryBuilderBrandWithoutParent = await this.brandsRepository
        .createQueryBuilder('brand')
        .select('brand.id', 'parentId')
        .addSelect('brand.name', 'parentName')
        .addSelect('brand.description', 'parentDescription')
        .addSelect('brand.status', 'parentStatus')
        .where('brand.parent IS NULL')
        .andWhere('brand.status = :STATUS_FILTER', { STATUS_FILTER })

      if(idsBrandParent.length > 0) {
        queryBuilderBrandWithoutParent.andWhere('brand.id NOT IN (:...idsBrandParent)', { idsBrandParent })
      }

      const listBrandWithoutParent = await queryBuilderBrandWithoutParent.getRawMany();

      return {
        error: false,
        data: [
          ...listBrandWithoutParent,
          ...listBrandAndChild
        ]
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  async update(id: number, dataUpdate: Partial<UpdateBrandDto>) {
    try {
      const infoBrandUpdate = await this.brandsRepository.findOneBy({ id });
      if(!infoBrandUpdate) {
        throw new BadRequestException(`Brand with id ${id} is not exist!`);
      }

      Object.assign(infoBrandUpdate, dataUpdate);

      const resultUpdateBrand = await this.brandsRepository.save(infoBrandUpdate);

      return {
        error: false,
        data: resultUpdateBrand,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
