interface CategoryModel {
  uid: string;
  name: string;
}

export class Category {
  uid: string;
  name: string;

  constructor ({ uid, name }: CategoryModel) {
    this.uid = uid;
    this.name = name;
  }
}