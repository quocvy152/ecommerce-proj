import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from 'src/users/entities/user.entity';
import { Roles } from 'src/utility/common/users/user-roles.enum';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandResponse, ListBrandResponse } from './types/response';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  async create(@Body() createBrandDto: CreateBrandDto, @CurrentUser() currentUser: UserEntity): Promise<CreateBrandResponse> {
    const resultCreate = await this.brandsService.create(createBrandDto, currentUser);
    return resultCreate;
  }

  @Get()
  async findAll(): Promise<ListBrandResponse> {
    const resultGetList = await this.brandsService.findAll();
    return resultGetList;
  }

  @Get('/child')
  async getListBrandAndChild(): Promise<ListBrandResponse> {
    const resultGetList = await this.brandsService.getListBrandAndChild();
    return resultGetList;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() dataUpdate: Partial<UpdateBrandDto>, 
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() currentUser: UserEntity
  ) {
    const resultUpdate = await this.brandsService.update(+id, dataUpdate, file, currentUser);
    return resultUpdate;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
