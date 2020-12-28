export interface GetTransactionsCouponsServiceModel {
  getTransactionsCoupons: () => Promise<string[]>;
}

export class GetTransactionsCouponsInteractor {
  private getTransactionsCouponsService: GetTransactionsCouponsServiceModel;

  constructor(getTransactionsCouponsService: GetTransactionsCouponsServiceModel) {
    this.getTransactionsCouponsService = getTransactionsCouponsService;
  }

  async getTransactionsCoupons() : Promise<string[]> {
    return this.getTransactionsCouponsService.getTransactionsCoupons();
  }
}