import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusSchema } from './status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }]),
  ],
  exports: [StatusService],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
