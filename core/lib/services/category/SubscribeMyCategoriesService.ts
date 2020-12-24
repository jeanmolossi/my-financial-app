import { Category } from "../../entities";
import { CategoryRepository } from "../../frameworks";
import { SubscribeMyCategoriesServiceModel } from "../../useCases";

export class SubscribeMyCategoriesService implements SubscribeMyCategoriesServiceModel {
  async subscribeMyCategories(
    callback: (categories: Category[]) => void
  ): Promise<() => void> {
    const categoryRepository = new CategoryRepository();

    return categoryRepository.subscribeMyCategories(callback);
  }
} 