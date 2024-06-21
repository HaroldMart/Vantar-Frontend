import { Product } from "./type";

export interface IProductRepository {
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(id: string, product: Product): Promise<boolean>;
  deleteProduct(id: string): Promise<boolean>;
}

export interface IProductService {
  getAll(): Promise<Product[]>;
  get(id: string): Promise<Product>;
  create(product: Product): Promise<string>;
  update(id: string, product: Product): Promise<string>;
  delete(id: string): Promise<string>;
}
