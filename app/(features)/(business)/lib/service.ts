import { Business } from "../../(business)/lib/model";
import { API } from "../../shared/api/config";
import { GenericService } from "../../shared/generic/service";

export class BusinessService {
  private businessService: GenericService<Business>;

  constructor() {
    this.businessService = new GenericService<Business>();
  }

  async getAllBusinesses(): Promise<Business[]> {
    const businesses = await this.businessService.getAllItems(`${API}/businesses`);
    if (!businesses.length) {
      throw new Error("No se encontraron negocios");
    }
    return businesses;
  }

  async getBusiness(businessId: string): Promise<Business> {
    const business = await this.businessService.getItem(`${API}/businesses/${businessId}`);
    if (!business) {
      throw new Error("No se encontró el negocio");
    }
    return business;
  }

  async createBusiness(business: Business): Promise<Business> {
    const newBusiness = await this.businessService.createItem(`${API}/businesses`, business);
    if (!newBusiness) {
      throw new Error("No se pudo crear el negocio");
    }
    return newBusiness;
  }

  async updateBusiness(businessId: string, business: Business): Promise<void> {
    const success = await this.businessService.updateItem(`${API}/businesses/${businessId}`, business);
    if (!success) {
      throw new Error("No se pudo actualizar el negocio");
    }
  }

  async deleteBusiness(businessId: string): Promise<void> {
    const success = await this.businessService.deleteItem(`${API}/businesses/${businessId}`);
    if (!success) {
      throw new Error("No se pudo eliminar el negocio");
    }
  }
}
