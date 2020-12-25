import { Category } from "../entities/Category";
import { CreateCategoryService } from "../services/category/CreateCategoryService";
import { GetMyCategoriesService } from "../services/category/GetMyCategoriesService";
import { SubscribeMyCategoriesService } from "../services/category/SubscribeMyCategoriesService";
import { CreateCategoryInteractor } from "../useCases/category/CreateCategoryService";
import { GetMyCategoriesInteractor } from "../useCases/category/GetMyCategoriesService";
import { SubscribeMyCategoriesInteractor } from "../useCases/category/SubscribeMyCategoriesService";

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