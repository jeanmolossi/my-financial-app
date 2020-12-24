import { Category, CategoryAdapter } from 'financial-core';

export async function createCategory(categoryName: string) {
  const categoryAdapter = new CategoryAdapter();

  return categoryAdapter.createCategory(categoryName);
}

export async function getMyCategories(){
  const categoryAdapter = new CategoryAdapter();

  return categoryAdapter.getMyCategories();
}

export async function subscribeMyCategories(
  callback: (categories: Category[]) => void
) {
  const categoryAdapter = new CategoryAdapter();

  return categoryAdapter.subscribeMyCategories(callback);
}