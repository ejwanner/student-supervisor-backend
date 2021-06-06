import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.categoryService.findAllCategories();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() category: CategoryDto, @Res() res: any) {
    const response = await this.categoryService.createCategory(category);
    res.json(response);
  }
}
