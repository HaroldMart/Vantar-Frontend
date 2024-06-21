export type Invoice = {
  id?: string;
  client_id: string;
  date: Date;
  total: number;
  details?: ProductDetails[];
};

export type ProductDetails = {
  id?: string;
  client_id: string;
  product: string;
  unit_price: number;
  amount: number;
  total: number;
};
