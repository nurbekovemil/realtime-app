import { ChatsService } from './chats.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('chat')
export class ChatsController {
  constructor(private ChatsService: ChatsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createChat(@Request() req, @Body() body) {
    const { id } = req.user;
    const { user_id } = body;
    return this.ChatsService.createNewChat(user_id, id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getUserChats(@Request() { user }) {
    const { id } = user;
    return this.ChatsService.getUserChats(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getChatMessages(@Param('id') id: number) {
    return this.ChatsService.getChatMessages(id);
  }
}
