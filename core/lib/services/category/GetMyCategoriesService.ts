import { Category } from "../../entities";
import { CategoryRepository } from "../../frameworks";
import { GetMyCategoriesServiceModel } from "../../useCases";

export class GetMyCategoriesService implements GetMyCategoriesServiceModel {
  async getMyCategories(): Promise<Category[]> {
    const categoryRepository = new CategoryRepository();

    return categoryRepository.getMyCategories();
  }
}