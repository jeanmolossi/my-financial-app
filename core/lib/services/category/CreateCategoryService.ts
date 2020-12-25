import { Category } from "../../entities/Category";
import { CategoryRepository } from "../../frameworks/firebase/category_repository";
import { CreateCategoryServiceModel } from "../../useCases/category/CreateCategoryService";

export class CreateCategoryService implements CreateCategoryServiceModel {
  async createCategory(name: string): Promise<Category> {
    const categoryRepository = new CategoryRepository();

    return categoryRepository.createCategory(name);
  }
}