import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersServiceController,
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  PaginationDto,
  LoginDto,
  LoginResponse,
  RefreshTokenDto,
  UsersServiceControllerMethods,
} from '../auth';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers(paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  login(loginDto: LoginDto): Promise<LoginResponse> {
    return this.usersService.login(loginDto);
  }

  refreshToken(refreshTokenDto: RefreshTokenDto): Promise<LoginResponse> {
    return this.usersService.refreshToken(refreshTokenDto);
  }
}