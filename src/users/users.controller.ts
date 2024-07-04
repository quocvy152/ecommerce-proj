/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FindUserResponse, ListUserResponse, SignUpResponse, SignInResponse } from './typings/response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/users/user-roles.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post('signin')
  async signIn(@Body() userSignInDto: UserSignInDto): Promise<SignInResponse> {
    const resultSignIn = await this.usersService.signIn(userSignInDto);
    return resultSignIn;
  }

  @Post('signup')
  async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<SignUpResponse> {
    const resultSignUp = await this.usersService.signUp(userSignUpDto);
    return resultSignUp;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.CUSTOMER]))
  @Get('')
  async findAll(): Promise<ListUserResponse> {
    const resultGetList = await this.usersService.findAll();
    return resultGetList;
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<FindUserResponse> {
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

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.CUSTOMER]))
  @Get('me')
  getProfile(@CurrentUser() currentUser:UserEntity) {
    return currentUser;
  }
}
