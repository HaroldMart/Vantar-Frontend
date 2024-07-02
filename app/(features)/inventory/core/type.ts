export type Inventory = {
  id?: string;
  client_id: string;
  date: Date;
  cost: number;
  total: number;
  sub_total: number;
  details?: ProductDetails[];
};

export type ProductDetails = {
  id?: string;
  client_id: string;
  product: string;
  unit_price: number;
  unit_cost: number;
  amount: number;
  total: number;
};
