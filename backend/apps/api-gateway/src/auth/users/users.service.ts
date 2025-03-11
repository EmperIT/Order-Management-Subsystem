import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  USERS_SERVICE_NAME,
  UsersServiceClient,
  PaginationDto,
  LoginDto,
  LoginResponse,
  RefreshTokenDto
} from '../auth';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll(paginationDto: PaginationDto) {
    return this.usersService.findAllUsers(paginationDto);
  }

  findOne(id: string) {
    return this.usersService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = updateUserDto;
    return this.usersService.updateUser({ id, ...updateData });
  }

  remove(id: string) {
    return this.usersService.removeUser({ id });
  }

  login(loginDto: LoginDto): Promise<LoginResponse> {
    return lastValueFrom(this.usersService.login(loginDto)).then((response) => {
      if (!response) {
        throw new Error('Login response is undefined');
      }
      return response;
    });
  }

  refreshToken(refreshTokenDto: RefreshTokenDto): Promise<LoginResponse> {
    return lastValueFrom(this.usersService.refreshToken(refreshTokenDto)).then(
      (response) => {
        if (!response) {
          throw new Error('Refresh token response is undefined');
        }
        return response;
      },
    );
  }
}
