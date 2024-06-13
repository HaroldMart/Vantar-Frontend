import {createProduct, deleteProduct, getAllProducts, getProduct, updateProduct} from "../utils/api"
import { Product } from "../utils/models"

export default function Page() {
    const miProductoAPedir = 1;
    const productoACrear: Product = {name: "kelvin", price: 30};
    const productoActualizar: Product = {name: "kritiam", price: 493};
    const miProductoAEliminar = 76;
    // If you want to test the functions, here are the calls
    // await getAllProducts();
    // await getProduct(1);
    // await createProduct(productoACrear);
    // await updateProduct(15, productoActualizar);
    // await deleteProduct(miProductoAEliminar);

    return (
        <h1>PRODUCTS</h1>
    )
}

