import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MENU_SERVICE } from './constants';
import { Menu } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { CloudinaryService } from '../../services/cloudinary.service';
import { promises as fs } from 'fs';

@Injectable()
export class MenuService implements OnModuleInit {
  private menuService: Menu.MenuServiceClient;

  constructor(
    @Inject(MENU_SERVICE) private client: ClientGrpc,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  onModuleInit() {
    this.menuService = this.client.getService<Menu.MenuServiceClient>(
      Menu.MENU_SERVICE_NAME,
    );
  }

  async create(
    createDishDto: Menu.CreateDishDto,
    file?: Express.Multer.File,
  ) {
    if (file) {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      createDishDto.imageUrl = imageUrl;
      await fs.unlink(file.path);
    }
    else {
      createDishDto.imageUrl = '';
    }
    return lastValueFrom(this.menuService.createDish(createDishDto));
  }

  findAll(paginationDto: Menu.PaginationDto) {
    return this.menuService.findAllDishes(paginationDto);
  }

  findOne(id: string) {
    return this.menuService.findOneDish({ id });
  }

  async update(id: string, updateDishDto: Menu.UpdateDishDto, file?: Express.Multer.File) {
    if (file) {
      const oldDish = await lastValueFrom(this.menuService.findOneDish({ id }));
      if (oldDish?.imageUrl) {
        const regex = /\/([^\/]+)\.\w+$/;
        const match = oldDish.imageUrl.match(regex);
        const publicId = match ? match[1] : '';
        await this.cloudinaryService.deleteImage(publicId);
      }
      const imageUrl = await this.cloudinaryService.uploadImage(file); 
      updateDishDto.imageUrl = imageUrl;
      await fs.unlink(file.path);
    }
    const { id: _, ...updateData } = updateDishDto;
    return lastValueFrom(this.menuService.updateDish({ id, ...updateData }));
  }

  async remove(id: string) {
    const dish = await lastValueFrom(this.menuService.findOneDish({ id }));
    if (dish?.imageUrl) {
      const regex = /\/([^\/]+)\.\w+$/;
      const match = dish.imageUrl.match(regex);
      const publicId = match ? match[1] : '';
      await this.cloudinaryService.deleteImage(publicId);
    }
    return lastValueFrom(this.menuService.removeDish({ id }));
  }
}
