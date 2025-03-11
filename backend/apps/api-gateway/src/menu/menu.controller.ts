import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards, HttpException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { AuthGuard } from '@nestjs/passport';
import { catchError } from 'rxjs';

@Controller('menu')
@UseGuards(AuthGuard('jwt')) // Bảo vệ tất cả các route bằng JWT
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createDishDto: any) {
    return this.menuService.create(createDishDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.menuService.findAll({ page, limit }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: any) {
    return this.menuService.update(id, updateDishDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
}

export { MenuService };
