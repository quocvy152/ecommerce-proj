/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post('signin')
  async signIn(@Body() userSignInDto: UserSignInDto): Promise<{
    data: UserEntity,
    accessToken: string
  }> {
    const resultSignIn = await this.usersService.signIn(userSignInDto);
    return resultSignIn;
  }

  @Post('signup')
  async signUp(@Body() userSignUpDto: UserSignUpDto):Promise<{ data: UserEntity }> {
    const resultSignUp = await this.usersService.signUp(userSignUpDto);
    return resultSignUp;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<{ data: UserEntity }> {
    const resultGetInfoUser = await this.usersService.findOne(+id);

    return resultGetInfoUser;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  
}
