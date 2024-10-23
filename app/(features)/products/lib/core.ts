// Model
export type Product = {
  id?: string;
  price: number
};

// Interfaces
export interface IProductService {
  getAll(): Promise<Product[]>;
  get(id: string): Promise<Product>;
  create(inventory: Product): Promise<string>;
  update(id: string, product: Product): Promise<string>;
  delete(id: string): Promise<string>;
}

