// Modelo de los inventarios de los clientes

export type Inventory = {
    id: string;
    business_id?: string;
    name: string;
    products: any[];
}