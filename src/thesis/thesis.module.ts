import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThesisSchema } from './thesis.schema';
import { ThesisController } from './thesis.controller';
import { ThesisService } from './thesis.service';
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Thesis', schema: ThesisSchema }]),
    UserModule,
    AuthModule,
  ],
  exports: [],
  controllers: [ThesisController],
  providers: [ThesisService],
})
export class ThesisModule {}
