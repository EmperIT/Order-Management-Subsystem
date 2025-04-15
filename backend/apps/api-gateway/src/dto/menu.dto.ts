import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@app/common';

export class CreateDishSwaggerDto implements Menu.CreateDishDto {
  @ApiProperty({
    description: 'Tên món ăn',
    example: 'Cơm rang dưa bò',
    required: true
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả món ăn',
    example: 'Cơm rang thơm ngon với dưa bò chất lượng cao',
    required: false
  })
  description: string;

  @ApiProperty({
    description: 'Giá món ăn',
    example: 50000,
    required: true
  })
  price: number;

  @ApiProperty({
    description: 'Trạng thái món ăn có sẵn hay không',
    example: true,
    default: true
  })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Loại món ăn',
    example: 'main',
    required: true
  })
  dishType: string;

  @ApiProperty({
    description: 'Danh mục món ăn',
    example: 'rice',
    required: false
  })
  category: string;

  @ApiProperty({
    description: 'URL hình ảnh món ăn',
    example: 'https://example.com/images/com-rang-dua-bo.jpg',
    required: false
  })
  imageUrl: string;
}

export class UpdateDishSwaggerDto implements Partial<Menu.UpdateDishDto> {
  @ApiProperty({
    description: 'ID của món ăn',
    required: true
  })
  id: string;

  @ApiProperty({
    description: 'Tên món ăn mới',
    example: 'Cơm rang dưa bò đặc biệt',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Mô tả món ăn mới',
    example: 'Cơm rang thơm ngon với dưa bò chất lượng cao, phiên bản đặc biệt',
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'Giá món ăn mới',
    example: 60000,
    required: false
  })
  price?: number;

  @ApiProperty({
    description: 'Trạng thái món ăn có sẵn hay không',
    example: true,
    required: false
  })
  isAvailable?: boolean;

  @ApiProperty({
    description: 'Loại món ăn mới',
    example: 'special',
    required: false
  })
  dishType?: string;

  @ApiProperty({
    description: 'Danh mục món ăn mới',
    example: 'special-rice',
    required: false
  })
  category?: string;

  @ApiProperty({
    description: 'URL hình ảnh món ăn mới',
    example: 'https://example.com/images/com-rang-dua-bo-special.jpg',
    required: false
  })
  imageUrl?: string;
}

export class DishSwaggerDto implements Menu.Dish {
  @ApiProperty({
    description: 'ID của món ăn'
  })
  id: string;

  @ApiProperty({
    description: 'Tên món ăn'
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả món ăn'
  })
  description: string;

  @ApiProperty({
    description: 'Giá món ăn'
  })
  price: number;

  @ApiProperty({
    description: 'Trạng thái món ăn có sẵn hay không'
  })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Loại món ăn'
  })
  dishType: string;

  @ApiProperty({
    description: 'Danh mục món ăn'
  })
  category: string;

  @ApiProperty({
    description: 'URL hình ảnh món ăn'
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Thời điểm tạo món ăn',
    format: 'date-time'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Thời điểm cập nhật món ăn gần nhất',
    format: 'date-time'
  })
  updatedAt: string;
}

export class DishesSwaggerDto implements Menu.Dishes {
  @ApiProperty({
    description: 'Danh sách món ăn',
    type: [DishSwaggerDto]
  })
  dishes: DishSwaggerDto[];

  @ApiProperty({
    description: 'Tổng số món ăn'
  })
  total: number;
}

export class PaginationSwaggerDto implements Menu.PaginationDto {
  @ApiProperty({
    description: 'Số trang',
    example: 1,
    default: 1
  })
  page: number;

  @ApiProperty({
    description: 'Số lượng món ăn trên mỗi trang',
    example: 10,
    default: 10
  })
  limit: number;
}