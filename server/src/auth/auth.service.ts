import { LoginDto } from './dto/login.dto';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private JwtService: JwtService,
  ) {}
  async registration(CreateUserDto: CreateUserDto) {
    const condidate = await this.UsersService.getUserByEmail(
      CreateUserDto.email,
    );
    if (condidate) {
      throw new HttpException(
        { message: `Email ${CreateUserDto.email} already exists` },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(CreateUserDto.password, 3);
    const user = await this.UsersService.createUser({
      ...CreateUserDto,
      password: hashPassword,
    });
    const token = await this.generateToken(user);
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token: {
        access: token,
      },
    };
  }
  async login(LoginDto: LoginDto) {
    const user = await this.UsersService.getUserByEmail(LoginDto.email);
    const passwordEquals = await bcrypt.compare(
      LoginDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      const token = await this.generateToken(user);
      return {
        user: {
          id: user.id,
          email: user.email,
        },
        token: {
          access: token,
        },
      };
    }
    throw new UnauthorizedException({ message: `Incorrect email or password` });
  }
  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = await this.JwtService.sign(payload, {
      secret: process.env.PRIVATE_JWT_KEY,
      expiresIn: '4h',
    });
    return token;
  }
  async verifyToken(token: string) {
    return await this.JwtService.verify(token.toString(), {
      secret: process.env.PRIVATE_JWT_KEY,
    });
  }
}
