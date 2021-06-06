import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { WsGuard } from '../auth/guards/websocket.guard';
import { ChatService } from './chat.service';
import { Message } from './chat.interface';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('msgToServer')
  @UseGuards(WsGuard)
  async handleMessage(client: Socket, payload: Message) {
    const message = await this.chatService.sendMessage(
      payload,
      client.handshake.query.token as string,
    );
    const conversation = await this.chatService.findRoomById(
      message.conversation,
    );

    this.server.emit(`receive-${conversation.owner._id}`, message);
    this.server.emit(`receive-${conversation.participant._id}`, message);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
