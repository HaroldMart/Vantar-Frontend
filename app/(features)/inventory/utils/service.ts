import { API } from "../../shared/api";
import { IGenericService } from "../../shared/interfaces";
import { Inventory } from "../core/type";

export class InventoryService {
  private _service: IGenericService<Inventory>;

  constructor(service: IGenericService<Inventory>) {
    this._service = service;
  }

  async getAll(): Promise<Inventory[] | string> {
    const url = API + "inventories";
    const data = await this._service.getAllItems(url);

    if (typeof data == "object") {
      const inventories: Inventory[] = data;
      return inventories;
    }

    return "Hubo un error al traer los inventarios";
  }

  async get(id: string): Promise<Inventory | string> {
    const url = API + `inventories/${id}`;
    const data = await this._service.getItem(url);

    if (typeof data == "object") {
      const inventory: Inventory = data;
      return inventory;
    }

    return "Hubo un error al traer el inventario";
  }

  async create(inventory: Inventory): Promise<Inventory | string> {
    const url = API + "inventories";
    const data = await this._service.createItem(url, inventory);

    if (typeof data == "object") {
      const inventory: Inventory = data;
      return inventory;
    }

    return "Hubo un error al crear el inventario";
  }

  async update(id: string, inventory: Inventory): Promise<string> {
    const url = API + `inventories/${id}`;
    const data = await this._service.updateItem(url, id, inventory);

    if (data == true) {
      console.log("updated");
      return "El inventario fue actualizado";
    }

    return "Hubo un error al actualizar el inventario";
  }

  async delete(id: string): Promise<string> {
    const url = API + `inventories/${id}`;
    const data = await this._service.deleteItem(url, id);

    if (data == true) {
      console.log("deleted");
      return "El inventario fue eliminado";
    }

    return "Hubo un error al eliminar el inventario";
  }
}
