import {createProduct, deleteProduct, getAllProducts, getProduct, updateProduct} from "../../utils/api/product"
import { Product } from "@/app/utils/models"


export default async function Page() {
    const integrantes = ["Haroldy", "Cristian", "Isael"]
    
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
        <main>
            <p>mai</p>

            <h3>Integrantes:</h3>

            <ul>
                {integrantes.map((persona, id) => {
                    return (<li key={id}>{persona}</li>)
                })}
            </ul>
        </main>
    )
}