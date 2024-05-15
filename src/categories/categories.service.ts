import { BadRequestException, Param } from '@nestjs/common';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Injectable, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { CreateCategoryResponse, UpdateCategoryResponse } from './types/response';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser: UserEntity): Promise<CreateCategoryResponse> {
    const category = await this.categoriesRepository.create(createCategoryDto);
    category.addedBy = currentUser;

    const resultCreateCategory = await this.categoriesRepository.save(category);

    return {
      error: false,
      data: resultCreateCategory
    };
  }

  findAll() {
    return `This action returns all categories`;
  }

  async findOne(id: number): Promise<CategoryEntity> {
    // const resultFindCategory = await this.categoriesRepository.findOneBy({ id });
    const resultFindCategory = await this.categoriesRepository.findOne({
      where: { id },
      relations: {
        addedBy: true
      }
    });
    return resultFindCategory;
  }

  async update(@Param('id') id: number, dataUpdate: Partial<UpdateCategoryDto>): Promise<UpdateCategoryResponse> {
    const infoCategory = await this.findOne(id);
    if(!infoCategory) {
      throw new BadRequestException(`Category ${id} not exist`);
    }

    Object.assign(infoCategory, dataUpdate);

    const resultUpdateCategory = await this.categoriesRepository.save(infoCategory);

    return {
      error: false,
      data: resultUpdateCategory,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

