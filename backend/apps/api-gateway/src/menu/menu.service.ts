import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MENU_SERVICE } from './constants';
import { Menu } from '@app/common';

@Injectable()
export class MenuService implements OnModuleInit {
  private menuService: Menu.MenuServiceClient;

  constructor(@Inject(MENU_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.menuService = this.client.getService<Menu.MenuServiceClient>(
      Menu.MENU_SERVICE_NAME,
    );
  }

  create(createDishDto: Menu.CreateDishDto) {
    return this.menuService.createDish(createDishDto);
  }

  findAll(paginationDto: Menu.PaginationDto) {
    return this.menuService.findAllDishes(paginationDto);
  }

  findOne(id: string) {
    return this.menuService.findOneDish({ id });
  }

  update(id: string, updateDishDto: Menu.UpdateDishDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = updateDishDto;
    return this.menuService.updateDish({ id, ...updateData });
  }

  remove(id: string) {
    return this.menuService.removeDish({ id });
  }
}
