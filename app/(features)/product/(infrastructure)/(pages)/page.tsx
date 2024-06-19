import { getAllProducts } from "../repository";
import { Product } from "../../core/type";

export default async function Page() {
    // const miProductoAPedir = 1;
    // const productoACrear: Product = {Name: "kelvin", Price: 30};
    // const productoActualizar: Product = {Name: "kritiam", Price: 493};
    // const miProductoAEliminar = 76;
    // If you want to test the functions, here are the calls
    const products = await getAllProducts();
    console.log(products[0])

    // await getProduct(1);
    // await createProduct(productoACrear);
    // await updateProduct(15, productoActualizar);
    // await deleteProduct(miProductoAEliminar);

    return (
        <h1>PRODUCTS</h1>
    )
}

