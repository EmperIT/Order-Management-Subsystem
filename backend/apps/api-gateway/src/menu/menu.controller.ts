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
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { 
  CreateDishSwaggerDto, 
  UpdateDishSwaggerDto, 
  DishSwaggerDto, 
  DishesSwaggerDto
} from '../dto/menu.dto';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Tạo món ăn mới' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Cơm rang dưa bò' },
        description: { type: 'string', example: 'Cơm rang thơm ngon với dưa bò chất lượng cao' },
        price: { type: 'number', example: 50000 },
        isAvailable: { type: 'boolean', example: true },
        dishType: { type: 'string', example: 'main' },
        category: { type: 'string', example: 'rice' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Hình ảnh món ăn (webp, png, jpg, jpeg)'
        }
      },
      required: ['name', 'price', 'dishType']
    }
  })
  @ApiResponse({ status: 201, description: 'Món ăn đã được tạo thành công', type: DishSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
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
  @ApiOperation({ summary: 'Lấy danh sách món ăn' })
  @ApiQuery({ name: 'page', required: false, description: 'Số trang', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng món ăn trên mỗi trang', type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Danh sách món ăn', type: DishesSwaggerDto })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.menuService.findAll({ page, limit }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin món ăn theo ID' })
  @ApiParam({ name: 'id', description: 'ID của món ăn' })
  @ApiResponse({ status: 200, description: 'Thông tin món ăn', type: DishSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy món ăn' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Cập nhật thông tin món ăn' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'ID của món ăn' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Cơm rang dưa bò đặc biệt' },
        description: { type: 'string', example: 'Cơm rang thơm ngon với dưa bò chất lượng cao, phiên bản đặc biệt' },
        price: { type: 'number', example: 60000 },
        isAvailable: { type: 'boolean', example: true },
        dishType: { type: 'string', example: 'special' },
        category: { type: 'string', example: 'special-rice' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Hình ảnh món ăn mới (webp, png, jpg, jpeg)'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Món ăn đã được cập nhật', type: DishSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy món ăn' })
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
  @ApiOperation({ summary: 'Xóa món ăn' })
  @ApiParam({ name: 'id', description: 'ID của món ăn' })
  @ApiResponse({ status: 200, description: 'Món ăn đã được xóa', type: DishSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy món ăn' })
  async remove(@Param('id') id: string) {
    try {
      return await this.menuService.remove(id);
    } catch (val) {
      throw new HttpException(val.message, 400);
    }
  }
}

