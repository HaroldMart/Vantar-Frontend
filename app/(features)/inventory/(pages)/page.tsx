import { GenericService } from "@/app/(features)/shared/service";
import { InventoryService } from "../utils/service";
import { Inventory } from "../core/type";

export default function Page() {
  // const miProductoAPedir = "d6a1";
  // const productoACrear: Product = { name: "kelvin", price: 40 };
  // const productoActualizar: Product = { name: "izaelle", price: 493 };
  // const miProductoAEliminar = "367f";

  // If you want to test the functions, here are the calls
  // const serv = new GenericService<Product>();
  // const service = new ProductService(serv);

  // const getProducts = await service.getAll();
  // console.log(getProducts);

  // const getProduct = await service.get(miProductoAPedir);
  // console.log(getProduct)

  // const createProduct = await service.create(productoACrear);
  // console.log(createProduct)

  // const updateProduct = await repository.updateProduct("367f", productoActualizar);
  // console.log(updateProduct)

  // const deleteProduct = await repository.deleteProduct(miProductoAEliminar);
  // console.log(deleteProduct)

  return (
    <div>
      <h1>Esta es la pagina de inventarios</h1>
      <li>Inventario xd</li>
      <li>Inventario xd</li>
      <li>Inventario xd</li>
      <li>Inventario xd</li>
      <li>Inventario xd</li>
      {/* <h1>PRODUCTS</h1>
      <p>Lista de productos</p>
      {getProducts.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))} */}
    </div>
  );
}
