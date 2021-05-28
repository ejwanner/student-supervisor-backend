import { Controller, Get, Post } from "@nestjs/common";
import { ThesisService } from "./thesis.service";

@Controller('api')
export class ThesisController {

  constructor(private thesisService: ThesisService) {}

  // Get all theses'
  @Get('theses')
  async getTheses() {

  }

  // Get one thesis
  @Get('thesis/detail/:thesisId')
  async getThesis() {

  }

  // Add new thesis
  @Post('thesis')
  async addThesis() {

  }

  // Edit thesis
  // student can select the thesis and supervisor can change the informations in the thesis
  @Post('thesis/:thesisId')
  async updateThesis() {

  }

  // Student select one thesis
  @Post('thesis/detail/:userId')
  async selectThesis() {

  }


  // Get all these of one supervisor
  @Get('thesis/:userId')
  async getSupervisorThese() {

  }
}