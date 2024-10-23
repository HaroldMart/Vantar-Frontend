export const users = [
  {
    id: "10",
    name: "Juliana",
  },
];

export const customers = [
  {
    id: "1",
    user_id: "10",
    name: "Carlos",
    last_name: "Esteban",
  },
  {
    id: "2",
    user_id: "10",
    name: "Izaelle",
    last_name: "Rosario",
  },
  {
    id: "3",
    user_id: "9",
    name: "Cristian",
    last_name: "Montes",
  },
];

export const business = [
  {
    id: "1",
    user_id: "10",
    name: "My colmado el luisito",
  },
  {
    id: "2",
    user_id: "10",
    name: "Mi tiendecitaaaaaaaaaaaaaa",
  },
  {
    id: "3",
    user_id: "9",
    name: "Mi tiendecita",
  },
];

export const products = [
  {
    id: "1",
    business_id: "1",
    name: "Empanada",
    unit_price: "10",
    unit_cost: "30",
  },
  {
    id: "2",
    business_id: "1",
    name: "Celular",
    unit_price: "10",
    unit_cost: "30",
  },
  {
    id: "2",
    business_id: "2",
    name: "PC",
    unit_price: "10",
    unit_cost: "30",
  },
];

export const inventories = [
  {
    id: "1",
    business_id: "1",
    date: "30/07/2024",
    cost: 30000,
    total: 50000,
    sub_total: 20000,
    products: [],
  },
  {
    id: "2",
    business_id: "1",
    date: "05/08/2025",
    cost: 30000,
    total: 50000,
    sub_total: 20000,
    products: [],
  },
  {
    id: "3",
    business_id: "1",
    date: "10/04/2024",
    cost: 40000,
    total: 70000,
    sub_total: 40000,
    products: [],
  },
];

export const invoice = [
  {
    id: "1",
    business_id: "1",
    date: "30/02/2024",
    products: [],
  },
  {
    id: "2",
    business_id: "1",
    date: "24/06/2024",
    products: [],
  },
];
