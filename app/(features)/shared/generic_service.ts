import { IGenericService } from "./interfaces";

export class GenericService<T> implements IGenericService<T> {
  constructor() {}

  // if (!response.ok) throw new Error(`ERROR: status ${response.status}`);

  async getAllItems(url: string): Promise<T[] | boolean> {
    const method = "GET";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log(`ERROR: status ${response.status}`);
        return false;
      }

      const data: T[] = await response.json();
      return data;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      return false;
    }
  }

  async getItem(url: string): Promise<T | boolean> {
    const method = "GET";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log(`ERROR: status ${response.status}`);
        return false;
      }

      const data: T = await response.json();
      return data;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      return false;
    }
  }

  async createItem(url: string, item: T): Promise<T | boolean> {
    const method = "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(item), // here I'm converting the T type into json for the request
      });

      if (!response.ok) {
        console.log(`ERROR: status ${response.status}`);
        return false;
      }

      const data: T = await response.json();
      return data;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      return false;
    }
  }

  async updateItem(url: string, item: T): Promise<boolean> {
    const method = "PUT";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(item), // here I'm converting the T type into json for the request
      });

      if (!response.ok) {
        console.log(`ERROR: status ${response.status}`);
        return false;
      }

      return true;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      return false;
    }
  }

  async deleteItem(url: string): Promise<boolean> {
    const method = "DELETE";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(`ERROR: status ${response.status}`);
        return false;
      }

      return true;
    } catch (err) {
      console.log(`There was an error during the ${method} request`);
      console.log(err);
      return false;
    }
  }
}
