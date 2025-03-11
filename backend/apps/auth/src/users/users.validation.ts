import { RpcException } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto, LoginDto, RefreshTokenDto } from '../auth';

export const validateCreateUser = (createUserDto: CreateUserDto) => {
  if (!createUserDto.username || createUserDto.username.trim() === '') {
    throw new RpcException('Username không được để trống');
  }
  if (!createUserDto.password || createUserDto.password.length < 6) {
    throw new RpcException('Password phải có ít nhất 6 ký tự');
  }
  if (!['manager', 'waitstaff', 'kitchen'].includes(createUserDto.role)) {
    throw new RpcException('Role không hợp lệ');
  }
  if (!createUserDto.name || createUserDto.name.trim() === '') {
    throw new RpcException('Name không được để trống');
  }
};

export const validateUpdateUser = (updateUserDto: UpdateUserDto) => {
  if (updateUserDto.username && updateUserDto.username.trim() === '') {
    throw new RpcException('Username không được để trống');
  }
  if (updateUserDto.password && updateUserDto.password.length < 6) {
    throw new RpcException('Password phải có ít nhất 6 ký tự');
  }
  if (updateUserDto.role && !['manager', 'waitstaff', 'kitchen'].includes(updateUserDto.role)) {
    throw new RpcException('Role không hợp lệ');
  }
  if (updateUserDto.name && updateUserDto.name.trim() === '') {
    throw new RpcException('Name không được để trống');
  }
};

export const validateLogin = (loginDto: LoginDto) => {
  if (!loginDto.username || loginDto.username.trim() === '') {
    throw new RpcException('Username không được để trống');
  }
  if (!loginDto.password) {
    throw new RpcException('Password không được để trống');
  }
};

export const validateRefreshToken = (refreshTokenDto: RefreshTokenDto) => {
  if (!refreshTokenDto.refreshToken) {
    throw new RpcException('Refresh token không được để trống');
  }
};