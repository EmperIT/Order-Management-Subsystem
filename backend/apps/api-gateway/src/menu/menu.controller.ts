import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MenuService } from './menu.service';
import { catchError } from 'rxjs';
import { from, Observable } from 'rxjs';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDishDto: any,
  ): Promise<Observable<any>> {
    if (file) {
      const allowedExtensions = ['.webp', '.png', '.jpg', '.jpeg'];
      const extension = file.originalname.match(/\.\w+$/);
      if (!extension || !allowedExtensions.includes(extension[0])) {
        throw new HttpException('Invalid file type', 400);
      }
    }
    return from(this.menuService.create(createDishDto, file)).pipe(
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
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateDishDto: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Observable<any>> {
    if (file) {
      const allowedExtensions = ['.webp', '.png', '.jpg', '.jpeg'];
      const extension = file.originalname.match(/\.\w+$/);
      if (!extension || !allowedExtensions.includes(extension[0])) {
        throw new HttpException('Invalid file type', 400);
      }
    }
    return from(this.menuService.update(id, updateDishDto, file)).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.menuService.remove(id);
    } catch (val) {
      throw new HttpException(val.message, 400);
    }
  }
  // @Patch(':id/availability')
  // async updateAvailability(
  //   @Param('id') id: string,
  //   @Body() body: { isAvailable: boolean },
  // ): Promise<Observable<any>> {
  //   return from(this.menuService.update(id, body)).pipe(
  //     catchError((val) => {
  //       throw new HttpException(val.message, 400);
  //     }),
  //   );
  // }
}

