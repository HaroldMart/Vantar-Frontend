import { ProductRepository } from "../repository";
import { Product } from "../../core/type";

export default async function Page() {
  const miProductoAPedir = "d6a1";
  const productoACrear: Product = { name: "kelvin", price: 30 };
  const productoActualizar: Product = { name: "izaelle", price: 493 };
  const miProductoAEliminar = "367f";

  // If you want to test the functions, here are the calls
  const repository = new ProductRepository();

  const getProducts = await repository.getAllProducts();
  console.log(getProducts);

  // const getProduct = await repository.getProduct(miProductoAPedir);
  // console.log(getProduct)

  // const createProduct = await repository.createProduct(productoACrear);
  // console.log(createProduct)

  // const updateProduct = await repository.updateProduct("367f", productoActualizar);
  // console.log(updateProduct)

  // const deleteProduct = await repository.deleteProduct(miProductoAEliminar);
  // console.log(deleteProduct)

  return (
    <div>
      <h1>PRODUCTS</h1>
      <p>Lista de productos</p>
      {getProducts.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
