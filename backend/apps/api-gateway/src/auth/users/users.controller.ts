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
import {
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  RefreshTokenDto
} from '@app/common';
import { AuthGuard } from '@nestjs/passport';
import { catchError} from 'rxjs';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.usersService.findAll({ page, limit }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.usersService.login(loginDto);
    } catch (val) {
      throw new HttpException(val.message, 400);
    }
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      return await this.usersService.refreshToken(refreshTokenDto);
    } catch (val) {
      throw new HttpException(val.message, 400);
    }
  }
}
