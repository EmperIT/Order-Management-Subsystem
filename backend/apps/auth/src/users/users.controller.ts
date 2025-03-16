import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '@app/common';

@Controller()
@Auth.UsersServiceControllerMethods()
export class UsersController implements Auth.UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: Auth.CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers(paginationDto: Auth.PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  findOneUser(findOneUserDto: Auth.FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: Auth.UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: Auth.FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  login(loginDto: Auth.LoginDto): Promise<Auth.LoginResponse> {
    return this.usersService.login(loginDto);
  }

  refreshToken(
    refreshTokenDto: Auth.RefreshTokenDto,
  ): Promise<Auth.LoginResponse> {
    return this.usersService.refreshToken(refreshTokenDto);
  }
}
