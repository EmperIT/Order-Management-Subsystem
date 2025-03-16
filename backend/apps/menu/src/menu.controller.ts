import { Controller } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from '@app/common';

@Controller()
@Menu.MenuServiceControllerMethods()
export class MenuController implements Menu.MenuServiceController {
  constructor(private readonly menuService: MenuService) {}

  createDish(createDishDto: Menu.CreateDishDto) {
    console.log('createDishDto', createDishDto);
    return this.menuService.create(createDishDto);
  }

  findAllDishes(paginationDto: Menu.PaginationDto) {
    return this.menuService.findAll(paginationDto);
  }

  findOneDish(findOneDishDto: Menu.FindOneDishDto) {
    return this.menuService.findOne(findOneDishDto.id);
  }

  updateDish(updateDishDto: Menu.UpdateDishDto) {
    return this.menuService.update(updateDishDto.id, updateDishDto);
  }

  removeDish(findOneDishDto: Menu.FindOneDishDto) {
    return this.menuService.remove(findOneDishDto.id);
  }
}
