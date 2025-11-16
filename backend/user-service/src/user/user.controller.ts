import { Controller, Get, UseGuards, Put, Param, Body, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.store';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Put(':id/role')
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateRole(
    @Param('id') id: string,
    @Body('role') role: 'user' | 'admin',
  ): User {
    return this.userService.updateRole(id, role);
  }
}
