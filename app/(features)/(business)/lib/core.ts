// Model
export type Business = {
  id: string;
  name: string;
  products: any[];
  inventories: any[];
};

// Interfaces
export interface IBusinessService {
  getAll(): Promise<Business[]>;
  get(id: string): Promise<Business>;
  create(inventory: Business): Promise<string>;
  update(id: string, business: Business): Promise<string>;
  delete(id: string): Promise<string>;
}

