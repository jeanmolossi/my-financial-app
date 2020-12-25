import { Category } from "../../entities/Category";
import { CategoryRepository } from "../../frameworks/firebase/category_repository";
import { SubscribeMyCategoriesServiceModel } from "../../useCases/category/SubscribeMyCategoriesService";

export class SubscribeMyCategoriesService implements SubscribeMyCategoriesServiceModel {
  async subscribeMyCategories(
    callback: (categories: Category[]) => void
  ): Promise<() => void> {
    const categoryRepository = new CategoryRepository();

    return categoryRepository.subscribeMyCategories(callback);
  }
} 