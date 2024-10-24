export interface IGenericService<T> {
  getAllItems(url : string): Promise<T[] | boolean>;
  getItem(url : string): Promise<T | boolean>;
  createItem(url : string, product: T): Promise<T | boolean>;
  updateItem(url : string, item: T): Promise<boolean>;
  deleteItem(url : string): Promise<boolean>;
}