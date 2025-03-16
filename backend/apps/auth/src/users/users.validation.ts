import { RpcException } from '@nestjs/microservices';
import { Auth } from '@app/common';

export const validateCreateUser = (createUserDto: Auth.CreateUserDto) => {
  if (!createUserDto.username || createUserDto.username.trim() === '') {
    throw new RpcException('Username không được để trống');
  }
  if (!createUserDto.password || createUserDto.password.length < 6) {
    throw new RpcException('Password phải có ít nhất 6 ký tự');
  }
  if (!createUserDto.name || createUserDto.name.trim() === '') {
    throw new RpcException('Name không được để trống');
  }
};

export const validateUpdateUser = (updateUserDto: Auth.UpdateUserDto) => {
  if (updateUserDto.username && updateUserDto.username.trim() === '') {
    throw new RpcException('Username không được để trống');
  }
  if (updateUserDto.password && updateUserDto.password.length < 6) {
    throw new RpcException('Password phải có ít nhất 6 ký tự');
  }
  if (updateUserDto.name && updateUserDto.name.trim() === '') {
    throw new RpcException('Name không được để trống');
  }
};

export const validateLogin = (loginDto: Auth.LoginDto) => {
  if (!loginDto.username || loginDto.username.trim() === '') {
    throw new RpcException('Username không được để trống');
  }
  if (!loginDto.password) {
    throw new RpcException('Password không được để trống');
  }
};

export const validateRefreshToken = (refreshTokenDto: Auth.RefreshTokenDto) => {
  if (!refreshTokenDto.refreshToken) {
    throw new RpcException('Refresh token không được để trống');
  }
};
