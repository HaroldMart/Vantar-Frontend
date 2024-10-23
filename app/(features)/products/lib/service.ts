import { API } from "../../shared/api";
import { IGenericService } from "../../shared/interfaces";
import { Product } from "./core";

// THIS IS THE ROUTE AND COMMAND FOR RUN THE FAKE DATABASE: "PS P:\Coding\vantar-frontend\app\(features)\shared> pnpm json-server db.json"

export class productService {
  private _service: IGenericService<Product>;

  constructor(service: IGenericService<Product>) {
    this._service = service;
  }

  async getAll(): Promise<Product[] | string> {
    const url = API + "products";
    const data = await this._service.getAllItems(url);

    if (typeof data == "object") {
      const products: Product[] = data;
      return products;
    }

    return "Hubo un error al traer los productos";
  }

  async get(id: string): Promise<Product | string> {
    const url = API + `products/${id}`;
    const data = await this._service.getItem(url);

    if (typeof data == "object") {
      const product: Product = data;
      return product;
    }

    return "Hubo un error al traer el producto";
  }

  async create(product: Product): Promise<Product | string> {
    const url = API + "products";
    const data = await this._service.createItem(url, product);

    if (typeof data == "object") {
      const product: Product = data;
      return product;
    }

    return "Hubo un error al crear el producto";
  }

  async update(id: string, product: Product): Promise<string> {
    const url = API + `products/${id}`;
    const data = await this._service.updateItem(url, id, product);

    if (data == true) {
      console.log("updated");
      return "El producto fue actualizado";
    }

    return "Hubo un error al actualizar el producto";
  }

  async delete(id: string): Promise<string> {
    const url = API + `products/${id}`;
    const data = await this._service.deleteItem(url, id);

    if (data == true) {
      console.log("deleted");
      return "El producto fue eliminado";
    }

    return "Hubo un error al eliminar el producto";
  }
}
