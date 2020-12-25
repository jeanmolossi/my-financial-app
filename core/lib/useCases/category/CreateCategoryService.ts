import { Category } from "../../entities/Category";

export interface CreateCategoryServiceModel {
  createCategory(name: string): Promise<Category>;
}

export class CreateCategoryInteractor {
  private createCategoryService: CreateCategoryServiceModel;

  constructor(createCategoryService: CreateCategoryServiceModel) {
    this.createCategoryService = createCategoryService;
  }

  async createCategory(name: string): Promise<Category> {
    return this.createCategoryService.createCategory(name);
  }
}