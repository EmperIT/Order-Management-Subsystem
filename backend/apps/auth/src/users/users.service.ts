import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '@app/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import {
  validateCreateUser,
  validateUpdateUser,
  validateLogin,
  validateRefreshToken,
} from './users.validation';

interface UserDocument {
  _id: string;
  username: string;
  password: string;
  role: string;
  name: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: Auth.CreateUserDto): Promise<Auth.User> {
    validateCreateUser(createUserDto);
    // Kiểm tra username trùng
    const existingUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
    if (existingUser) {
      throw new RpcException('Username đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    await user.save();
    return this.mapToUser(user);
  }

  async findAll(paginationDto: Auth.PaginationDto): Promise<Auth.Users> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;
    const users = await this.userModel.find().skip(skip).limit(limit).exec();
    const total = await this.userModel.countDocuments().exec();
    return { users: users.map(this.mapToUser), total };
  }

  async findOne(id: string): Promise<Auth.User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: `Không tìm thấy user với id ${id}`,
      });
    }
    return this.mapToUser(user);
  }

  async update(
    id: string,
    updateUserDto: Auth.UpdateUserDto,
  ): Promise<Auth.User> {
    validateUpdateUser(updateUserDto); // Validation

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: `Không tìm thấy user với id ${id}`,
      });
    }

    // Kiểm tra username trùng
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userModel
        .findOne({ username: updateUserDto.username })
        .exec();
      if (existingUser) {
        throw new RpcException({
          statusCode: 409,
          message: 'Username đã tồn tại',
        });
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    user.updatedAt = new Date();
    await user.save();
    return this.mapToUser(user);
  }

  async remove(id: string): Promise<Auth.User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: `Không tìm thấy user với id ${id}`,
      });
    }
    return this.mapToUser(user);
  }

  async login(loginDto: Auth.LoginDto): Promise<Auth.LoginResponse> {
    validateLogin(loginDto); // Validation

    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new RpcException({
        statusCode: 401,
        message: 'Username hoặc password không đúng',
      });
    }
    const accessToken = this.jwtService.sign({
      sub: user._id,
      role: user.role,
    });
    const refreshToken = this.generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  }

  async refreshToken(
    refreshTokenDto: Auth.RefreshTokenDto,
  ): Promise<Auth.LoginResponse> {
    validateRefreshToken(refreshTokenDto); // Validation

    const { refreshToken } = refreshTokenDto;
    const user = await this.userModel.findOne({ refreshToken }).exec();
    if (!user) {
      throw new RpcException({
        statusCode: 401,
        message: 'Refresh token không hợp lệ',
      });
    }
    const accessToken = this.jwtService.sign({
      sub: user._id,
      role: user.role,
    });
    const newRefreshToken = this.generateRefreshToken(user._id);
    user.refreshToken = newRefreshToken;
    await user.save();
    return { accessToken, refreshToken: newRefreshToken };
  }

  private generateRefreshToken(userId: string): string {
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
    if (!refreshSecret) {
      throw new RpcException({
        statusCode: 500,
        message: 'JWT_REFRESH_SECRET tạo thất bại',
      });
    }
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: refreshSecret,
        expiresIn: '7d',
      },
    );
  }

  private mapToUser(user: UserDocument): Auth.User {
    return {
      id: user._id.toString(),
      username: user.username,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
