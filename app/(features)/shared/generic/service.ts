import axios from 'axios';

interface IGenericService<T> {
  getAllItems(url: string): Promise<T[]>;
  getItem(url: string): Promise<T | null>;
  createItem(url: string, item: T): Promise<T | null>;
  updateItem(url: string, item: T): Promise<boolean>;
  deleteItem(url: string): Promise<boolean>;
}

export class GenericService<T> implements IGenericService<T> {
  constructor() {}

  async getAllItems(url: string): Promise<T[]> {
    try {
      const { data } = await axios.get<T[]>(url);
      return data;
    } catch (error) {
      console.error(`Error during GET request at ${url}`, error);
      return [];
    }
  }

  async getItem(url: string): Promise<T | null> {
    try {
      const { data } = await axios.get<T>(url);
      return data;
    } catch (error) {
      console.error(`Error during GET request at ${url}`, error);
      return null;
    }
  }

  async createItem(url: string, item: T): Promise<T | null> {
    try {
      const { data } = await axios.post<T>(url, item);
      return data;
    } catch (error) {
      console.error(`Error during POST request at ${url}`, error);
      return null;
    }
  }

  async updateItem(url: string, item: T): Promise<boolean> {
    try {
      await axios.put(url, item);
      return true;
    } catch (error) {
      console.error(`Error during PUT request at ${url}`, error);
      return false;
    }
  }

  async deleteItem(url: string): Promise<boolean> {
    try {
      await axios.delete(url);
      return true;
    } catch (error) {
      console.error(`Error during DELETE request at ${url}`, error);
      return false;
    }
  }
}
