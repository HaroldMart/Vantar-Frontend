import { ProductRepository } from "../repository";
import { Product } from "../../core/type";

export default async function Page() {
    const miProductoAPedir = "0771";
    const productoACrear: Product = {name: "kelvin", price: 30};
    const productoActualizar: Product = {name: "izaelle", price: 493};
    const miProductoAEliminar = "367f";
    // If you want to test the functions, here are the calls

    const repository = new ProductRepository()

    // const getProducts = await repository.getAllProducts();
    // console.log(products[1])

    // const getProduct = await repository.getProduct(miProductoAPedir);
    // console.log(product)

    // const createProduct = await repository.createProduct(productoACrear);
    // console.log(product)

    // const updateProduct = await repository.updateProduct("367f", productoActualizar);
    // console.log(updateProduct)

    // const deleteProduct = await repository.deleteProduct(miProductoAEliminar);
    // console.log(deleteProduct)

    return (
        <h1>PRODUCTS</h1>
    )
}

