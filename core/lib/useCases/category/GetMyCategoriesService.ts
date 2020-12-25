import { Category } from "../../entities/Category";

export interface GetMyCategoriesServiceModel {
  getMyCategories(): Promise<Category[]>;
}

export class GetMyCategoriesInteractor {
  private getMyCategoriesService: GetMyCategoriesServiceModel;

  constructor(getMyCategoriesService: GetMyCategoriesServiceModel) {
    this.getMyCategoriesService = getMyCategoriesService;
  }

  async getMyCategories(): Promise<Category[]> {
    return this.getMyCategoriesService.getMyCategories();
  }
}