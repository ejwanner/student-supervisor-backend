import { Body, Controller, Get, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ThesisService } from './thesis.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from "../user/user.service";
import { CreateThesisDto } from "./dto/create-thesis.dto";
import { UpdateThesisDto } from "./dto/update-thesis.dto";
import { log } from "util";

@Controller()
export class ThesisController {
  constructor(
    private thesisService: ThesisService,
    private userService: UserService,
  ) {}

  // GET all theses
  @Get('theses')
  @UseGuards(AuthGuard('jwt'))
  async getTheses() {
    return await this.thesisService.getAllThese();
  }

  // GET one thesis by ID
  @Get('thesis/:thesisId')
  @UseGuards(AuthGuard('jwt'))
  async getThesis(@Param('thesisId') thesisId: string) {
    return await this.thesisService.getOneThesis(thesisId);
  }

  // ADD one thesis
  @Post('thesis')
  @UseGuards(AuthGuard('jwt'))
  async addThesis(@Body() createThesisDto: CreateThesisDto, @Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.payload.user.email,
    );
    return this.thesisService.createThesis(createThesisDto, user);
  }

  // Supervisor update one thesis
  @Put('thesis/:thesisId')
  @UseGuards(AuthGuard('jwt'))
  async updateThesis(@Body() updateThesisDto: UpdateThesisDto, @Param('thesisId') thesisId: string, @Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.payload.user.email,
    );
    return await this.thesisService.supervisorUpdateThesis(updateThesisDto, thesisId, user);
  }

  // Student select one thesis
  @Put('thesis/student/:thesisId')
  @UseGuards(AuthGuard('jwt'))
  async studentSelectThesis(@Param('thesisId') thesisId: string, @Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.payload.user.email,
    );
    return this.thesisService.studentSelectThesis(thesisId, user);
  }

  @Get('thesis/supervisor/sv-theses')
  @UseGuards(AuthGuard('jwt'))
  async getSupervisorTheses(@Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.payload.user.email,
    );
    return await this.thesisService.getAllSupervisorTheses(user);
  }

  // GET all second supervisor for one thesis depends on their preferred category
  @Get('thesis/supervisor/second')
  @UseGuards(AuthGuard('jwt'))
  async getSecondSupervisor(@Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.payload.user.email,
    );
    return await this.thesisService.getSecondSupervisor(user);
  }

  @Get('thesis/supervisor/second/sv-theses')
  @UseGuards(AuthGuard('jwt'))
  async getSecondSupervisorTheses(@Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.payload.user.email,
    );
    const test =  await this.thesisService.getAllSecondSupervisorTheses(user);
    console.log(test);
    return test;
  }
}
