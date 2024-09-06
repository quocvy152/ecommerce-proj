import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageEntity } from './entities/image.entity';
import { CreateImageResponse } from './types/response';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imagesRepository: Repository<ImageEntity>,
  ) { }

  async create(createImageDto: CreateImageDto, @CurrentUser() currentUser: UserEntity): Promise<CreateImageResponse> {
    try {
      const newImage = {
        ...createImageDto,
        addedBy: currentUser
      }

      const result = await this.imagesRepository.create(newImage);

      const resultCreate = await this.imagesRepository.save(result);

      return {
        error: false,
        data: resultCreate
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
