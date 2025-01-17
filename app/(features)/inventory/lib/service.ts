import { Inventory } from "@/app/(features)/inventory/lib/model";
import { GenericService } from "@/app/(features)/shared/generic/service";
// import { API } from "@/app/(features)/shared/api/config";

const API = "http://localhost:2020/";

export interface IInventoryService {
    getAllInventories(businessId: string): Promise<Inventory[]>;
    getInventory(businessId: string, inventoryId: string): Promise<Inventory>;
    createInventory(businessId: string, inventory: Inventory): Promise<Inventory>;
    updateInventory(businessId: string, inventoryId: string, inventory: Inventory): Promise<void>;
    deleteInventory(businessId: string, inventoryId: string): Promise<void>;
}

export class InventoryService implements IInventoryService {
    private inventoryService: GenericService<Inventory>;
    static getAllInventories: any;

    constructor() {
        this.inventoryService = new GenericService<Inventory>();
    }

    async getAllInventories(businessId: string): Promise<Inventory[]> {
        const inventories = await this.inventoryService.getAllItems(`${API}/inventories`);
        if (!inventories.length) {
            throw new Error("No se encontraron inventarios");
        }

        const business_inventories: Inventory[] = inventories.filter((inventory) => inventory.business_id == businessId)
        return business_inventories;
    }

    async getInventory(businessId: string, inventoryId: string): Promise<Inventory> {
        const inventory = await this.inventoryService.getItem(`${API}/inventories/${inventoryId}`);
        if (!inventory) {
            throw new Error("No se encontró el inventario");
        }

        if (inventory.business_id != businessId) throw new Error("No se encontró inventario para este negocio");
        return inventory;
    }

    async createInventory(businessId: string, inventory: Inventory): Promise<Inventory> {
        inventory.business_id = businessId;
        if (inventory.business_id != businessId) {
            throw new Error("Error agregando inventario a este negocio");
        }
        const created_inventory = await this.inventoryService.createItem(`${API}/inventories/`, inventory);

        if (!created_inventory) {
            throw new Error("No se puedo crear el inventario");
        }
        return created_inventory;
    }

    async updateInventory(businessId: string, inventoryId: string, inventory: Inventory): Promise<void> {
        await this.getInventory(businessId, inventoryId); // Verifica que el inventario exista
        const success = await this.inventoryService.updateItem(`${API}/inventories/${inventoryId}`, inventory);

        if (!success) {
            throw new Error("No se pudo actualizar el inventario");
        }
    }

    async deleteInventory(businessId: string, inventoryId: string ): Promise<void> {
        await this.getInventory(businessId, inventoryId); // Verifica que el inventario exista
        const success = await this.inventoryService.deleteItem(`${API}/inventories/${inventoryId}`);

        if (!success) {
            throw new Error("No se pudo eliminar el inventario");
        }
    }
}