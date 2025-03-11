import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MENU_SERVICE } from './constants';
import {
  CreateDishDto,
  UpdateDishDto,
  MENU_SERVICE_NAME,
  MenuServiceClient,
  PaginationDto
} from './menu';

@Injectable()
export class MenuService implements OnModuleInit {
  private menuService: MenuServiceClient;

  constructor(@Inject(MENU_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.menuService = this.client.getService<MenuServiceClient>(MENU_SERVICE_NAME);
  }

  create(createDishDto: CreateDishDto) {
      return this.menuService.createDish(createDishDto);
    }
  
    findAll(paginationDto: PaginationDto) {
      return this.menuService.findAllDishes(paginationDto);
    }
  
    findOne(id: string) {
      return this.menuService.findOneDish({ id });
    }
  
    update(id: string, updateDishDto: UpdateDishDto) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...updateData } = updateDishDto;
      return this.menuService.updateDish({ id, ...updateData });
    }
  
    remove(id: string) {
      return this.menuService.removeDish({ id });
    }
}