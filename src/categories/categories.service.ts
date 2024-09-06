import { BadRequestException, Body, Get, Injectable, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesService } from 'src/images/images.service';
import { uploadFile } from 'src/services/image_kit_io';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryResponse, ListCategoryResponse, UpdateCategoryResponse } from './types/response';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,

    private readonly imageService: ImagesService,
  ) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser: UserEntity): Promise<CreateCategoryResponse> {
    try {
      const { parentId, title, description } = createCategoryDto;

      const parentCategory = parentId ? await this.findById(parentId) : null;

      const newCategory = {
        title,
        description,
        parent: parentCategory
      }

      const category = await this.categoriesRepository.create(newCategory);

      category.addedBy = currentUser;

      const resultCreateCategory = await this.categoriesRepository.save(category);

      return {
        error: false,
        data: resultCreateCategory
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<ListCategoryResponse> {
    try {
      const resultGetList = await this.categoriesRepository
        .createQueryBuilder('category')
        .getMany()

      return {
        error: false,
        data: resultGetList
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getListCategoryAndChild(): Promise<ListCategoryResponse> {
    try {
      const resultGetList = await this.categoriesRepository
        .createQueryBuilder('category')
        .select('parentCategory.id', 'parentId')
        .addSelect('parentCategory.title', 'parentTitle')
        .addSelect('parentCategory.description', 'parentDescription')
        .addSelect(`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', category.id,
              'title', category.title,
              'description', category.description
            )
          )  
        `, 'categoryChild')
        .leftJoin('category.parent', 'parentCategory')
        .where('parentCategory.id IS NOT NULL')
        .groupBy('parentCategory.id')
        .addGroupBy('parentCategory.title')
        .addGroupBy('parentCategory.description')
        .getRawMany();

      const idsCategoryParentHaveChild = resultGetList.map(categoryItem => categoryItem.parentId);

      const recordsWithoutParent = await this.categoriesRepository
        .createQueryBuilder('category')
        .select('category.id', 'parentId')
        .addSelect('category.title', 'parentTitle')
        .addSelect('category.description', 'parentDescription')
        .where('category.parent IS NULL')
        .andWhere('category.id NOT IN (:...ids)', { ids: idsCategoryParentHaveChild })
        .getRawMany();

      return {
        error: false,
        data: [
          ...resultGetList,
          ...recordsWithoutParent
        ]
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<CategoryEntity> {
    const resultFindCategory = await this.categoriesRepository.findOneBy({ id });
    return resultFindCategory;
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const resultFindCategory = await this.categoriesRepository.findOne({
      where: { id },
      relations: {
        addedBy: true
      }
    });
    return resultFindCategory;
  }

  async update(@Param('id') id: number, dataUpdate: Partial<UpdateCategoryDto>, file: Express.Multer.File, @CurrentUser() currentUser: UserEntity): Promise<UpdateCategoryResponse> {
    try {
      const infoCategory = await this.findOne(id);
      if (!infoCategory) {
        throw new BadRequestException(`Category ${id} not exist`);
      }

      if(file) {
        const { originalname, buffer } = file;

        const resultUpload = await uploadFile({ 
          fileName: originalname,
          file: buffer.toString('base64'),
        });

        const dataCreateImage = {
          name: resultUpload.name,
          size: resultUpload.size,
          path: resultUpload.url
        }
        const resultCreateImage = await this.imageService.create(dataCreateImage, currentUser);

        infoCategory.image = resultCreateImage.data;
      }
    
      Object.assign(infoCategory, dataUpdate);

      const resultUpdateCategory = await this.categoriesRepository.save(infoCategory);

      return {
        error: false,
        data: resultUpdateCategory,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

