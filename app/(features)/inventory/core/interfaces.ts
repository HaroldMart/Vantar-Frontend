import { Inventory } from "./type";
export interface IProductService {
  getAll(): Promise<Inventory[]>;
  get(id: string): Promise<Inventory>;
  create(inventory: Inventory): Promise<string>;
  update(id: string, inventory: Inventory): Promise<string>;
  delete(id: string): Promise<string>;
}
