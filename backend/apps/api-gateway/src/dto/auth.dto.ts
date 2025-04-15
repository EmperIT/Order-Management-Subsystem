import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '@app/common';

export class CreateUserSwaggerDto implements Auth.CreateUserDto {
  @ApiProperty({
    description: 'Tên đăng nhập của người dùng',
    example: 'admin',
    required: true
  })
  username: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123',
    required: true,
    minLength: 6
  })
  password: string;

  @ApiProperty({
    description: 'Tên đầy đủ của người dùng',
    example: 'Quản trị viên',
    required: true
  })
  name: string;
}

export class LoginSwaggerDto implements Auth.LoginDto {
  @ApiProperty({
    description: 'Tên đăng nhập của người dùng',
    example: 'admin',
    required: true
  })
  username: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123',
    required: true
  })
  password: string;
}

export class RefreshTokenSwaggerDto implements Auth.RefreshTokenDto {
  @ApiProperty({
    description: 'Token làm mới để lấy token mới',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true
  })
  refreshToken: string;
}

export class UpdateUserSwaggerDto implements Partial<Auth.UpdateUserDto> {
  @ApiProperty({
    description: 'ID của người dùng',
    required: true
  })
  id: string;

  @ApiProperty({
    description: 'Tên đăng nhập mới của người dùng',
    example: 'admin2',
    required: false
  })
  username?: string;

  @ApiProperty({
    description: 'Mật khẩu mới của người dùng',
    example: 'newpassword123',
    required: false,
    minLength: 6
  })
  password?: string;

  @ApiProperty({
    description: 'Tên đầy đủ mới của người dùng',
    example: 'Quản trị viên mới',
    required: false
  })
  name?: string;
}

export class LoginResponseSwaggerDto implements Auth.LoginResponse {
  @ApiProperty({
    description: 'Access token để xác thực người dùng',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token để làm mới access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  refreshToken: string;
}

export class UserSwaggerDto implements Auth.User {
  @ApiProperty({
    description: 'ID của người dùng'
  })
  id: string;

  @ApiProperty({
    description: 'Tên đăng nhập của người dùng'
  })
  username: string;

  @ApiProperty({
    description: 'Tên đầy đủ của người dùng'
  })
  name: string;

  @ApiProperty({
    description: 'Thời điểm tạo người dùng',
    format: 'date-time'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Thời điểm cập nhật người dùng gần nhất',
    format: 'date-time'
  })
  updatedAt: string;
}

export class UsersSwaggerDto implements Auth.Users {
  @ApiProperty({
    description: 'Danh sách người dùng',
    type: [UserSwaggerDto]
  })
  users: UserSwaggerDto[];

  @ApiProperty({
    description: 'Tổng số người dùng'
  })
  total: number;
}