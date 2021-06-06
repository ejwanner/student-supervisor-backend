import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation, Message } from './chat.interface';
import { CreateConversationDto } from './chat.dto';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { JWT_SECRET } from '../shared/constants';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Conversation')
    private conversationModel: Model<Conversation>,
    @InjectModel('Message')
    private messageModel: Model<Message>,
    private userService: UserService,
  ) {}

  async createConversation(conversation: CreateConversationDto) {
    const newConversation = new this.conversationModel();
    newConversation.owner = {
      ...conversation.owner,
      _id: mongoose.Types.ObjectId(conversation.owner._id),
    } as any;
    newConversation.participant = {
      ...conversation.participant,
      _id: mongoose.Types.ObjectId(conversation.participant._id),
    } as any;
    return newConversation.save();
  }

  async findAllConversations(user: User) {
    return this.conversationModel
      .find({
        $or: [{ owner: user }, { participant: user }],
      } as any)
      .populate('owner', '-password')
      .populate('participant', '-password');
  }

  async findRoomById(id: any) {
    return this.conversationModel
      .findOne({ _id: id })
      .populate('owner', '-password')
      .populate('participant', '-password');
  }

  async sendMessage(message: Message, token: string) {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET) as any;
    const hostedUser = await this.userService.findUserByEmail(
      decoded.user.email,
    );
    console.log(message.message);
    const newMessage = new this.messageModel();
    newMessage.createdBy = hostedUser;
    newMessage.message = message.message;
    newMessage.conversation = await this.findRoomById(
      mongoose.Types.ObjectId(message.conversation._id),
    );
    return newMessage.save();
  }

  async findMessages(user: User) {
    const myConversations = await this.findAllConversations(user);
    return this.messageModel
      .find({ conversation: { $in: myConversations.map((conv) => conv._id) } })
      .populate('conversation')
      .populate('createdBy');
  }
}
