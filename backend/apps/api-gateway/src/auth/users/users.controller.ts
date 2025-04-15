import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '@app/common';
import { AuthGuard } from '@nestjs/passport';
import { catchError } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { 
  CreateUserSwaggerDto, 
  LoginSwaggerDto, 
  RefreshTokenSwaggerDto, 
  UpdateUserSwaggerDto,
  UserSwaggerDto,
  UsersSwaggerDto,
  LoginResponseSwaggerDto
} from '../../dto/auth.dto';

@ApiTags('auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo người dùng mới', description: 'Yêu cầu xác thực JWT' })
  @ApiBody({ type: CreateUserSwaggerDto })
  @ApiResponse({ status: 201, description: 'Người dùng đã được tạo thành công', type: UserSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  create(@Body() createUserDto: Auth.CreateUserDto) {
    return this.usersService.create(createUserDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách người dùng', description: 'Yêu cầu xác thực JWT' })
  @ApiQuery({ name: 'page', required: false, description: 'Số trang', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng kết quả trên mỗi trang', type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Danh sách người dùng', type: UsersSwaggerDto })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.usersService.findAll({ page, limit }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID', description: 'Yêu cầu xác thực JWT' })
  @ApiParam({ name: 'id', description: 'ID của người dùng' })
  @ApiResponse({ status: 200, description: 'Thông tin người dùng', type: UserSwaggerDto })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng', description: 'Yêu cầu xác thực JWT' })
  @ApiParam({ name: 'id', description: 'ID của người dùng' })
  @ApiBody({ type: UpdateUserSwaggerDto })
  @ApiResponse({ status: 200, description: 'Người dùng đã được cập nhật', type: UserSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  update(@Param('id') id: string, @Body() updateUserDto: Auth.UpdateUserDto) {
    return this.usersService.update(id, updateUserDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa người dùng', description: 'Yêu cầu xác thực JWT' })
  @ApiParam({ name: 'id', description: 'ID của người dùng' })
  @ApiResponse({ status: 200, description: 'Người dùng đã được xóa', type: UserSwaggerDto })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiBody({ type: LoginSwaggerDto })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công', type: LoginResponseSwaggerDto })
  @ApiResponse({ status: 400, description: 'Thông tin đăng nhập không hợp lệ' })
  async login(@Body() loginDto: Auth.LoginDto) {
    try {
      return await this.usersService.login(loginDto);
    } catch (val) {
      throw new HttpException(val.message, 400);
    }
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Làm mới token' })
  @ApiBody({ type: RefreshTokenSwaggerDto })
  @ApiResponse({ status: 200, description: 'Token đã được làm mới', type: LoginResponseSwaggerDto })
  @ApiResponse({ status: 400, description: 'Refresh token không hợp lệ' })
  async refreshToken(@Body() refreshTokenDto: Auth.RefreshTokenDto) {
    try {
      return await this.usersService.refreshToken(refreshTokenDto);
    } catch (val) {
      throw new HttpException(val.message, 400);
    }
  }
}
