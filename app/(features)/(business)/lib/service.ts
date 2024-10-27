import { Product } from "../../products/lib/model";
import { API } from "../../shared/api/config";
import { GenericService } from "../../shared/generic/service";
import { Business } from "./model";

export class BusinessService {
  private businessService;

  constructor() {
    this.businessService = new GenericService<Business>
  }

  async getAllBusinesses(): Promise<Business[] | string> {
    try {
      const businesses = await this.businessService.getAllItems(`${API}/businesses`);
      return businesses.length ? businesses : "No se encontraron negocios";
    } catch (error) {
      console.error("Error al obtener los negocios:", error);
      return "Hubo un error al traer los negocios";
    }
  }

  async getBusiness(businessId: string): Promise<Business | string> {
    try {
      const business = await this.businessService.getItem(`${API}/businesses/${businessId}`);
      return business ?? "No se encontró el negocio";
    } catch (error) {
      console.error("Error al obtener el negocio:", error);
      return "Hubo un error al traer el negocio";
    }
  }

  async createBusiness(business: Business): Promise<Business | string> {
    try {
      const newBusiness = await this.businessService.createItem(`${API}/businesses`, business);
      return newBusiness ?? "No se pudo crear el negocio";
    } catch (error) {
      console.error("Error al crear el negocio:", error);
      return "Hubo un error al crear el negocio";
    }
  }

  async updateBusiness(businessId: string, business: Business): Promise<string> {
    try {
      const updated = await this.businessService.updateItem(`${API}/businesses/${businessId}`, business);
      return updated ? "El negocio fue actualizado" : "No se pudo actualizar el negocio";
    } catch (error) {
      console.error("Error al actualizar el negocio:", error);
      return "Hubo un error al actualizar el negocio";
    }
  }

  async deleteBusiness(businessId: string): Promise<string> {
    try {
      const deleted = await this.businessService.deleteItem(`${API}/businesses/${businessId}`);
      return deleted ? "El negocio fue eliminado" : "No se pudo eliminar el negocio";
    } catch (error) {
      console.error("Error al eliminar el negocio:", error);
      return "Hubo un error al eliminar el negocio";
    }
  }

  // Función para devolver solo los productos de un negocio específico
  async getBusinessProducts(businessId: string): Promise<Product[] | string> {
    try {
      const business = await this.getBusiness(businessId);
      if (typeof business === "object") {
        return business.products.length ? business.products : "El negocio no tiene productos";
      }
      return business; // Retorna el mensaje de error desde getBusiness si no es objeto
    } catch (error) {
      console.error("Error al obtener los productos del negocio:", error);
      return "Hubo un error al obtener los productos del negocio";
    }
  }
}
