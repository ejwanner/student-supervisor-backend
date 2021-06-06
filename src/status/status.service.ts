import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from './status.interface';
import { StatusDto } from './status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel('Status')
    private statusModel: Model<Status>,
  ) {}

  async findAllStatus() {
    return this.statusModel.find();
  }

  async createStatus(status: StatusDto) {
    const newStatus = new this.statusModel(status);
    return newStatus.save();
  }
}
