import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/registration')
  registration(@Body() CreateUserDto: CreateUserDto) {
    return this.AuthService.registration(CreateUserDto);
  }
  @Post('/login')
  login(@Body() LoginDto: LoginDto) {
    return this.AuthService.login(LoginDto);
  }
}
