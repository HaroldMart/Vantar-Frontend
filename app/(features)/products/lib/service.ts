import { Product } from "../../products/lib/model";
import { API } from "../../shared/api/config";
import { GenericService } from "../../shared/generic/service";

export interface IProductService {
  getAllProducts(businessId: string): Promise<Product[]>;
  getProduct(businessId: string, productId: string): Promise<Product>;
  createProduct(businessId: string, product: Product): Promise<Product>;
  updateProduct(businessId: string, productId: string, product: Product): Promise<void>;
  deleteProduct(businessId: string, productId: string): Promise<void>;
}

export class ProductService implements IProductService {
  private productService: GenericService<Product>;

  constructor() {
    this.productService = new GenericService<Product>();
  }

  async getAllProducts(businessId: string): Promise<Product[]> {
    const products = await this.productService.getAllItems(`${API}/products`);
    if (!products.length) {
      throw new Error("No se encontraron productos");
    }

    const business_products : Product [] = products.filter((product) => product.business_id == businessId)
    return business_products;
  }

  async getProduct(businessId: string, productId: string): Promise<Product> {
    const product = await this.productService.getItem(`${API}/products/${productId}`);
    if (!product) {
      throw new Error("No se encontró el producto");
    }

    if (product.business_id != businessId) throw new Error("No se encontró producto para este negocio");
    return product;
  }

  async createProduct(businessId: string, product: Product): Promise<Product> {
    product.business_id = businessId;
    if (product.business_id != businessId) {
      throw new Error("Error agregando producto a este negocio");
    }
    const created_product = await this.productService.createItem(`${API}/products/`, product);
    
    if (!created_product) {
      throw new Error("No se puedo crear el producto");
    }
    return created_product;
  }

  async updateProduct(businessId: string, productId: string, product: Product): Promise<void> {
    await this.getProduct(businessId, productId); // Verifica que el producto exista
    const success = await this.productService.updateItem(`${API}/products/${productId}`, product);
    
    if (!success) {
      throw new Error("No se pudo actualizar el producto");
    }
  }

  async deleteProduct(businessId: string, productId: string): Promise<void> {
    await this.getProduct(businessId, productId); // Verifica que el producto exista
    const success = await this.productService.deleteItem(`${API}/products/${productId}`);
    
    if (!success) {
      throw new Error("No se pudo eliminar el producto");
    }
  }
}
