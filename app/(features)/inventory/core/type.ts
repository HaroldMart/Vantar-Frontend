export type Inventory = {
  id?: string;
  customer_id: string;
  date: Date;
  cost: number;
  total: number;
  sub_total: number;
  products?: ProductDetails[];
};

export type ProductDetails = {
  product: string;
  unit_price: number;
  unit_cost: number;
  amount: number;
  total: number;
};
