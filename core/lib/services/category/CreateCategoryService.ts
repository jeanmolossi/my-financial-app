import { Category } from "../../entities";
import { CategoryRepository } from "../../frameworks";
import { CreateCategoryServiceModel } from "../../useCases";

export class CreateCategoryService implements CreateCategoryServiceModel {
  async createCategory(name: string): Promise<Category> {
    const categoryRepository = new CategoryRepository();

    return categoryRepository.createCategory(name);
  }
}