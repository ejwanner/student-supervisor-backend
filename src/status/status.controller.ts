import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { AuthGuard } from '@nestjs/passport';
import { StatusDto } from './status.dto';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.statusService.findAllStatus();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() status: StatusDto, @Res() res: any) {
    const response = await this.statusService.createStatus(status);
    res.json(response);
  }
}
