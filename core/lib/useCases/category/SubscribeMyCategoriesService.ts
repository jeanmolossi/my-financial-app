import { Category } from "../../entities/Category";

export interface SubscribeMyCategoriesServiceModel {
  subscribeMyCategories(
    callback: (categories: Category[]) => void
  ): Promise<() => void>;
}

export class SubscribeMyCategoriesInteractor {
  private subscribeMyCategoriesService: SubscribeMyCategoriesServiceModel;

  constructor(subscribeMyCategoriesService: SubscribeMyCategoriesServiceModel) {
    this.subscribeMyCategoriesService = subscribeMyCategoriesService;
  }

  async subscribeMyCategories(
    callback: (categories: Category[]) => void
  ): Promise<() => void> {
    return this.subscribeMyCategoriesService.subscribeMyCategories(callback);
  }
}