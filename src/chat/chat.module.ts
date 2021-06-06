import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema, MessageSchema } from './chat.schema';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
    UserModule,
    AuthModule,
  ],
  exports: [],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
