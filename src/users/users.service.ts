import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { FindUserResponse, ListUserResponse, SignInResponse, SignUpResponse } from './typings/response';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  async signIn(userSignInDto: UserSignInDto): Promise<SignInResponse> {
    const isExistUser = await this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email', { email: userSignInDto.email }).getOne();
    if (!isExistUser) {
      throw new BadRequestException('Email is not exist');
    }

    const isMatchPass = await compare(userSignInDto.password, isExistUser.password);
    if (!isMatchPass) {
      throw new BadRequestException('Password is wrong');
    }

    delete isExistUser.password;

    const accessToken = await this.generateAccessToken(isExistUser);
    const refreshToken = await this.generateRefreshToken(isExistUser);

    return {
      error: false,
      data: isExistUser,
      accessToken,
      refreshToken
    };
  }

  async signUp(userSignUpDto: UserSignUpDto): Promise<SignUpResponse> {
    const isExisUsername = await this.findUserByUsername(userSignUpDto.username);
    if (isExisUsername) {
      throw new BadRequestException('Username is not available');
    }

    const isExistEmail = await this.findUserByEmail(userSignUpDto.email);
    if (isExistEmail) {
      throw new BadRequestException('Email is not available');
    }

    const isExistPhone = await this.findUserByPhone(userSignUpDto.phone);
    if (isExistPhone) {
      throw new BadRequestException('Phone is not available');
    }

    userSignUpDto.password = await hash(userSignUpDto.password, 10);

    const user = this.usersRepository.create(userSignUpDto);
    const resultCreateUser = await this.usersRepository.save(user);

    delete resultCreateUser.password;

    return {
      error: false,
      data: resultCreateUser
    };
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<ListUserResponse> {
    const listUser = await this.usersRepository.find();

    return {
      error: false,
      data: listUser
    };
  }

  async findOne(id: number): Promise<FindUserResponse> {
    const infoUser = await this.usersRepository.findOneBy({ id });
    if (!infoUser) {
      throw new NotFoundException('Cannot get info user')
    }

    return {
      error: false,
      data: infoUser
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    const infoUser = await this.usersRepository.findOneBy({ email });
    return infoUser;
  }

  async findUserByPhone(phone: string) {
    const infoUser = await this.usersRepository.findOneBy({ phone });
    return infoUser;
  }

  async findUserByUsername(username: string) {
    const infoUser = await this.usersRepository.findOneBy({ username });
    return infoUser;
  }

  async generateAccessToken(userEntity: UserEntity): Promise<string> {
    const accessToken = await sign({ id: userEntity.id, email: userEntity.email }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
    return accessToken;
  }

  async generateRefreshToken(userEntity: UserEntity): Promise<string> {
    const refreshToken = await sign({ id: userEntity.id, email: userEntity.email }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
    return refreshToken;
  }
}