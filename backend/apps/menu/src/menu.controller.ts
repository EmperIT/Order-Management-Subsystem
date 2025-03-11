import { Controller} from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  MenuServiceController,
  CreateDishDto,
  UpdateDishDto,
  FindOneDishDto,
  PaginationDto,
  MenuServiceControllerMethods,
} from './menu';

@Controller()
@MenuServiceControllerMethods()
export class MenuController implements MenuServiceController {
  constructor(private readonly menuService: MenuService) {}

  createDish(createDishDto: CreateDishDto) {
    console.log('createDishDto', createDishDto);
    return this.menuService.create(createDishDto);
  }

  findAllDishes(paginationDto: PaginationDto) {
    return this.menuService.findAll(paginationDto);
  }

  findOneDish(findOneDishDto: FindOneDishDto) {
    return this.menuService.findOne(findOneDishDto.id);
  }

  updateDish(updateDishDto: UpdateDishDto) {
    return this.menuService.update(updateDishDto.id, updateDishDto);
  }

  removeDish(findOneDishDto: FindOneDishDto) {
    return this.menuService.remove(findOneDishDto.id);
  }
}