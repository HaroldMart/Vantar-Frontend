import { IProductRepository } from "../core/interfaces";
import { Product } from "../core/type";
import { API } from "../../shared/api";

export class ProductRepository implements IProductRepository {
  constructor() {}

  async getAllProducts(): Promise<Product[]> {
    const method = "GET";
    const url = API + "products";

    try {
      // console.log(`A GET request was made to the endpoint: ${url}`)
      const response = await fetch(url);

      if (!response.ok) throw new Error(`ERROR: status ${response.status}`);

      const data: Product[] = await response.json();

      return data;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      return [];
    }
  }

  // getting a product
  async getProduct(id: string): Promise<Product> {
    const method = "GET";
    const url = API + `products/${id}`;

    try {
      // console.log(`A GET request was made to the endpoint: ${url}`)
      const response = await fetch(url);

      if (!response.ok) throw new Error(`ERROR: status ${response.status}`);

      const data: Product = await response.json();

      return data;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      const defaultResponse: Product = { id: "", name: "default", price: 0 };
      return defaultResponse;
    }
  }

  // creating a product
  async createProduct(product: Product): Promise<Product> {
    const method = "POST";
    const url = API + "products";

    try {
      // console.log(`A ${method} request was made to the endpoint: ${url}`)
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product), // here I'm converting the product type into json for the request
      });

      if (!response.ok) throw new Error(`ERROR: status ${response.status}`);

      const data: Product = await response.json();

      return data;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      const defaultResponse: Product = { id: "", name: "default", price: 0 };
      return defaultResponse;
    }
  }

  // updating a product
  async updateProduct(id: string, product: Product): Promise<boolean> {
    const method = "PUT";
    const url = API + `products/${id}`;

    try {
      // console.log(`A ${method} request was made to the endpoint: ${url}`)
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product), // here I'm converting the product type into json for the request
      });

      if (!response.ok) throw new Error(`ERROR: status ${response.status}`);

      return true;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      const defaultResponse = false;
      return defaultResponse;
    }
  }

  // deleting a product
  async deleteProduct(id: string): Promise<boolean> {
    const method = "DELETE";
    const url = API + `products/${id}`;

    try {
      // console.log(`A ${method} request was made to the endpoint: ${url}`)
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`ERROR: status ${response.status}`);

      return true;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      const defaultResponse = false;
      return defaultResponse;
    }
  }
}
