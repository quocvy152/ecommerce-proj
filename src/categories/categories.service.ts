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

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser: UserEntity): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.create(createCategoryDto);
    category.addedBy = currentUser;
    return await this.categoriesRepository.save(category);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

