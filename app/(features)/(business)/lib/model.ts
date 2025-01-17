import { Product } from "../../products/lib/model";

export type Business = {
  id: string;
  name: string;
  products?: Product[];
};
