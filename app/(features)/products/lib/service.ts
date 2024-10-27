import { Business } from "../../(business)/lib/model";
import { Product } from "../../products/lib/model";
import { API } from "../../shared/api/config";
import { GenericService } from "../../shared/generic/service";

export class ProductService {
  private productService: GenericService<Product>;
  private businessService: GenericService<Business>;

  constructor() {
    this.productService = new GenericService<Product>();
    this.businessService = new GenericService<Business>();
  }

  async getAllProducts(businessId: string): Promise<Product[]> {
    const business = await this.businessService.getItem(`${API}/businesses/${businessId}`);
    if (!business || !business.products || !business.products.length) {
      throw new Error("No se encontraron productos para este negocio");
    }
    return business.products;
  }

  async getProduct(businessId: string, productId: string): Promise<Product> {
    const business = await this.businessService.getItem(`${API}/businesses/${businessId}`);
    if (!business) {
      throw new Error("No se encontró el producto");
    }
    const product = business.products.find((p: Product) => p.id === productId);
    
    if (!product) {
      throw new Error("No se pudo obtener el producto");
    }
    return product;
  }

  async createProduct(businessId: string, product: Product): Promise<Product> {
    const business = await this.businessService.getItem(`${API}/businesses/${businessId}`);
    if (!business) {
      throw new Error("No se encontró el negocio al cual agregar el producto");
    }
    business.products.push(product)
    return product;
  }

  async updateProduct(businessId: string, productId: string, product: Product): Promise<void> {
    await this.getProduct(businessId, productId); // Verifica que el producto exista
    const business = await this.businessService.getItem(`${API}/businesses/${businessId}`);
    
    if (!business) {
      throw new Error("No se encontró el negocio");
    }

    const productIndex = business.products.findIndex((p: Product) => p.id === productId);
    business.products[productIndex] = { ...business.products[productIndex], ...product };
    return business.products[productIndex];
  }

  async deleteProduct(businessId: string, productId: string): Promise<void> {
    await this.getProduct(businessId, productId); // Verifica que el producto exista
    const business = await this.businessService.getItem(`${API}/businesses/${businessId}`);
    
    if (!business) {
      throw new Error("No se encontró el negocio");
    }

    const productIndex = business.products.findIndex((p: Product) => p.id === productId);
    business.products.splice(productIndex, 1);
  }
}
