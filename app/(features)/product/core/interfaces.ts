import { Product } from "./type";
export interface IProductService {
  getAll(): Promise<Product[]>;
  get(id: string): Promise<Product>;
  create(product: Product): Promise<string>;
  update(id: string, product: Product): Promise<string>;
  delete(id: string): Promise<string>;
}
