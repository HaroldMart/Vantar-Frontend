import { IProductRepository } from "../core/interfaces";

export class ProductService {
  private _repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this._repository = repository;
  }
}
