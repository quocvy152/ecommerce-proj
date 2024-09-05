import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Roles } from 'src/utility/common/users/user-roles.enum';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryResponse, ListCategoryResponse } from './types/response';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser: UserEntity): Promise<CreateCategoryResponse> {
    const resultCreateCategory = await this.categoriesService.create(createCategoryDto, currentUser);
    return resultCreateCategory;
  }

  @Get()
  async findAll(): Promise<ListCategoryResponse> {
    const resultGetList = await this.categoriesService.findAll();
    return resultGetList;
  }

  @Get('/children')
  async getListCategoryAndChild(): Promise<ListCategoryResponse> {
    const resultGetList = await this.categoriesService.getListCategoryAndChild();
    return resultGetList;
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
    async update(@Param('id') id: number, @Body() dataUpdate: Partial<UpdateCategoryDto>, @UploadedFile() file: Express.Multer.File) {
    const resultUpdate = await this.categoriesService.update(+id, dataUpdate, file);
    return resultUpdate;
  }
}
