import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThesisModule } from './thesis/thesis.module';
import { ChatModule } from './chat/chat.module';
import { CategoryModule } from './category/category.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://elias:iIlaidKXkpnZvJK5@api-cluster.faunk.mongodb.net/thesis-supervisor?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
    ThesisModule,
    ChatModule,
    CategoryModule,
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
