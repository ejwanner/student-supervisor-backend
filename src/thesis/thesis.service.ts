import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Thesis } from "./thesis.interface";
import { Model } from "mongoose";
import { CreateThesisDto } from "./dto/create-thesis.dto";
import { User } from "../user/user.interface";
import { UpdateThesisDto } from "./dto/update-thesis.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class ThesisService {
  constructor(
    @InjectModel('Thesis')
    private thesisModel: Model<Thesis>,
    private userService: UserService,
  ) {}

  async createThesis(createThesisDto: CreateThesisDto, user: User) {
    const thesisNotExists = await this.thesisNotExists(createThesisDto.title);
    const isUserSupervisor = await this.isUserSupervisor(user);
    if (thesisNotExists) {
      if (isUserSupervisor) {
        const thesis = new this.thesisModel({
          title: createThesisDto.title,
          description: createThesisDto.description,
          category: createThesisDto.category,
          status: "Draft",
          is_billed: false,
          supervisorId: user._id,
          secondSupervisorId: '60c377c0d9d4afad999eb16e'
        });
        return thesis.save();
      } else {
        throw new HttpException('You are not a supervisor', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Thesis title is already taken!', HttpStatus.CONFLICT);
    }
  }

  async getAllThese() {
    return this.thesisModel.find();
  }

  async getOneThesis(thesisId: string) {
    return await this.thesisModel.findOne({_id: thesisId});
  }

  async supervisorUpdateThesis(updateThesisDto: UpdateThesisDto, thesisId: string, user: User) {
    const isUserSupervisor = await this.isUserSupervisor(user);
    if (isUserSupervisor) {
      const supervisorUpdateThesis = new this.thesisModel({
        _id: thesisId,
        title: updateThesisDto.title,
        description: updateThesisDto.description,
        category: updateThesisDto.category,
        status: updateThesisDto.status,
        is_billed: updateThesisDto.is_billed,
        secondSupervisorId: updateThesisDto.secondSupervisorId
      });
      return this.thesisModel.updateOne({_id: thesisId}, supervisorUpdateThesis)
    } else {
      throw new HttpException('You are not able to update the thesis', HttpStatus.FORBIDDEN)
    }
  }

  async studentSelectThesis(thesisId: string, user: User) {
    const isUserSupervisor = await this.isUserSupervisor(user);
    if (!isUserSupervisor) {
      const selectThesis = new this.thesisModel({
        _id: thesisId,
        studentId: user._id,
      });
      return this.thesisModel.updateOne({_id: thesisId}, selectThesis)
    } else {
      throw new HttpException('You are not able to select a thesis', HttpStatus.FORBIDDEN)
    }
  }

  async getSecondSupervisor(user: User) {
    return await this.userService.findSecondSupervisor(user);
  }

  async getAllSupervisorTheses(user: User) {
    const isUserSupervisor = await this.isUserSupervisor(user);
    if (isUserSupervisor) {
      this.thesisModel.find()
        .then(result => {
          console.log(result);
          result.filter(i => {
            i.category === user.preferredCategory
          })
        })
        .then(item => {
          return item;
        })
    }
  }

  async getAllSecondSupervisorTheses(user: User) {
    return new Promise((resolve, reject) => {
      const isUserSupervisor = this.isUserSupervisor(user);
      if (isUserSupervisor) {
        console.log(user);
        this.thesisModel.find({'secondSupervisorId': user._id})
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err)
          })
      }
    });
  }

  private isUserSupervisor(user:User) {
    return user.supervisor;
  }

  private thesisNotExists(title: string) {
    return new Promise(async (resolve, reject) => {
      this.thesisModel.findOne({ title: title }, function (err, thesis) {
        if (err) {
          reject(new Error('Server Error'));
        }
        if (Boolean(thesis)) {
          reject(new Error('The thesis title is taken!'));
        }
        resolve(true);
      });
    });
  }
}