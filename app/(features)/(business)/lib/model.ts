import { Product } from "../../products/lib/model";

export type Business = {
  id: string;
  name: string;
  products?: Product[]; // se esta validando si se va a necesitar la lista o se eliminara
};
