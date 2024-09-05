import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesService } from './images.service';

import axios from 'axios';
import * as FormData from 'form-data';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append("file", file.buffer.toString('base64'));
    formData.append("fileName", "vivawool_prod_001.png");

    const options = {
      method: 'POST',
      url: 'https://upload.imagekit.io/api/v2/files/upload',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
        Accept: 'application/json',
        Authorization: 'Basic cHJpdmF0ZV9NOW0xNU5Id1p0dG5LZXg0QUwvZkJRWUhxSGM9Og=='
      },
      data: formData
    };
    
    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      return error;
    }
  }
}
