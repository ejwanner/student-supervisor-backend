import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { CreateConversationDto } from './chat.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service';

@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  @Get('conversation')
  @UseGuards(AuthGuard('jwt'))
  async findAllConversations(@Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.payload.user.email,
    );
    return this.chatService.findAllConversations(user);
  }

  @Get('message')
  @UseGuards(AuthGuard('jwt'))
  async findMessages(@Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.payload.user.email,
    );
    return this.chatService.findMessages(user);
  }

  @Post('conversation/create')
  @UseGuards(AuthGuard('jwt'))
  async createConversation(@Body() conversation: CreateConversationDto) {
    return this.chatService.createConversation(conversation);
  }
}
