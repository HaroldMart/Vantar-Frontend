import { API } from "../../shared/api";
import { IGenericService } from "../../shared/interfaces";
import { Business } from "./core";

// THIS IS THE ROUTE AND COMMAND FOR RUN THE FAKE DATABASE: "PS P:\Coding\vantar-frontend\app\(features)\shared> pnpm json-server db.json"

export class businessService {
  private _service: IGenericService<Business>;

  constructor(service: IGenericService<Business>) {
    this._service = service;
  }
  
  async getAllTest(id: string): Promise<Business[] | string> {
    const url = API + `businesses/${id}`;
    const data = await this._service.getAllItems(url);

    if (typeof data == "object") {
      const businesses: Business[] = data;
      return businesses;
    }

    return "Hubo un error al traer los negocios";
  }

  async getAll(): Promise<Business[] | string> {
    const url = API + "businesses";
    const data = await this._service.getAllItems(url);

    if (typeof data == "object") {
      const businesses: Business[] = data;
      return businesses;
    }

    return "Hubo un error al traer los negocios";
  }

  async get(id: string): Promise<Business | string> {
    const url = API + `businesses/${id}`;
    const data = await this._service.getItem(url);

    if (typeof data == "object") {
      const business: Business = data;
      return business;
    }

    return "Hubo un error al traer el negocio";
  }

  async create(business: Business): Promise<Business | string> {
    const url = API + "businesses";
    const data = await this._service.createItem(url, business);

    if (typeof data == "object") {
      const business: Business = data;
      return business;
    }

    return "Hubo un error al crear el negocio";
  }

  async update(id: string, business: Business): Promise<string> {
    const url = API + `businesses/${id}`;
    const data = await this._service.updateItem(url, business);

    if (data == true) {
      console.log("updated");
      return "El negocio fue actualizado";
    }

    return "Hubo un error al actualizar el negocio";
  }

  async delete(id: string): Promise<string> {
    const url = API + `businesses/${id}`;
    const data = await this._service.deleteItem(url);

    if (data == true) {
      console.log("deleted");
      return "El negocio fue eliminado";
    }

    return "Hubo un error al eliminar el negocio";
  }
}
