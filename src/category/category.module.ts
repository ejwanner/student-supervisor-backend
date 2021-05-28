import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Module({
  imports: [

  ],
  exports: [],
  controllers: [],
  providers: [CategoryService]
})
export class CategoryModule {}