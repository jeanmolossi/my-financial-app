import { Category } from "../../entities/Category";
import { CategoryRepository } from "../../frameworks/firebase/category_repository";
import { GetMyCategoriesServiceModel } from "../../useCases/category/GetMyCategoriesService";

export class GetMyCategoriesService implements GetMyCategoriesServiceModel {
  async getMyCategories(): Promise<Category[]> {
    const categoryRepository = new CategoryRepository();

    return categoryRepository.getMyCategories();
  }
}