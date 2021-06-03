import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.interface';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private categoryModel: Model<Category>,
  ) {}

  async findAllCategories() {
    return this.categoryModel.find();
  }

  async createCategory(category: CategoryDto) {
    const newCategory = new this.categoryModel(category);
    return newCategory.save();
  }
}
