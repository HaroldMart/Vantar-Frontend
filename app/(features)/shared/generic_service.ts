import { IGenericService } from "./interfaces";

export class GenericService<T> implements IGenericService<T> {
  constructor() {}

  private async handleFetchResponse(
    response: Response,
    url: string
  ): Promise<T | boolean> {
    if (!response.ok) {
      console.log(`ERROR: status ${response.status} at ${url}`);
      return false;
    }
    return await response.json();
  }

  async getAllItems(url: string): Promise<T[] | boolean> {
    try {
      const response = await fetch(url);
      const data: T[] = await response.json(); // this not use the handleFetchResponse function
      return data;
    } catch (err) {
      console.log(`There was an error during the GET request at ${url}`);
      console.log(err);
      return false;
    }
  }

  async getItem(url: string): Promise<T | boolean> {
    try {
      const response = await fetch(url);
      return await this.handleFetchResponse(response, url);
    } catch (err) {
      console.log(`There was an error during the GET request at ${url}`);
      console.log(err);
      return false;
    }
  }

  async createItem(url: string, item: T): Promise<T | boolean> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(item),
      });
      return await this.handleFetchResponse(response, url);
    } catch (err) {
      console.log(`There was an error during the POST request at ${url}`);
      console.log(err);
      return false;
    }
  }

  async updateItem(url: string, item: T): Promise<boolean> {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(item),
      });
      return response.ok;
    } catch (err) {
      console.log(`There was an error during the PUT request at ${url}`);
      console.log(err);
      return false;
    }
  }

  async deleteItem(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      return response.ok;
    } catch (err) {
      console.log(`There was an error during the DELETE request at ${url}`);
      console.log(err);
      return false;
    }
  }
}
