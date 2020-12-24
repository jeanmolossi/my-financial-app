import { Category } from "../entities";
import { CreateCategoryService, GetMyCategoriesService, SubscribeMyCategoriesService } from "../services/category";
import { CreateCategoryInteractor, GetMyCategoriesInteractor, SubscribeMyCategoriesInteractor } from "../useCases";

export class CategoryAdapter {
  async createCategory(name: string): Promise<Category> {
    const service = new CreateCategoryService();
    const interactor = new CreateCategoryInteractor(service);

    return interactor.createCategory(name);
  }

  async getMyCategories(): Promise<Category[]> {
    const service = new GetMyCategoriesService();
    const interactor = new GetMyCategoriesInteractor(service);

    return interactor.getMyCategories();
  }

  async subscribeMyCategories(
    callback: (categories: Category[]) => void
  ): Promise<() => void> {
    const service = new SubscribeMyCategoriesService();
    const interactor = new SubscribeMyCategoriesInteractor(service);

    return interactor.subscribeMyCategories(callback);
  }
}