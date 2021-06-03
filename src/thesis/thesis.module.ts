import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThesisSchema } from './thesis.schema';
import { ThesisController } from './thesis.controller';
import { ThesisService } from './thesis.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Thesis', schema: ThesisSchema }]),
  ],
  exports: [ThesisService],
  controllers: [ThesisController],
  providers: [ThesisService],
})
export class ThesisModule {}
