import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';

@Controller('user')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:name')
  searchUserByName(@Request() { user }, @Param('name') name: string) {
    return this.UsersService.searchUserByName(name, user.id);
  }
}
