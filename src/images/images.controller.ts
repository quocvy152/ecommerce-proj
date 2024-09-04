import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesService } from './images.service';

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
    // const base64String = file.buffer.toString('base64');
    // return base64String;

    // formData.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InByaXZhdGVfTTltMTVOSHdadHRuS2V4NEFML2ZCUVlIcUhjPSJ9.eyJmaWxlTmFtZSI6InZpdmF3b29sX3Byb2R1Y3RfMDAxLmpwZyIsInVzZVVuaXF1ZUZpbGVOYW1lIjoiZmFsc2UiLCJpYXQiOjE3MjU0MjgyNDcwOTAsImV4cCI6MTcyNTQ3MTI5NjAwMH0.9KlVhVoM8twtu2T_Lp-HF3pHx4EAQCBNVW0pACm6HTA");

    const dataUploadFile = {
      fileName: 'vivawool_prod_001.png'
    }

    const options = {
      method: 'POST',
      url: 'https://upload.imagekit.io/api/v2/files/upload',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
        Accept: 'application/json',
        Authorization: 'Basic cHJpdmF0ZV9NOW0xNU5Id1p0dG5LZXg0QUwvZkJRWUhxSGM9Og=='
      },
      data: JSON.stringify(dataUploadFile)
    };
    
    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
