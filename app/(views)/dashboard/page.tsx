import {createProduct, getProduct} from "../../utils/api/product"
import { Product } from "@/app/utils/models"


export default async function Page() {
    const integrantes = ["Haroldy", "Cristian", "Isael"]
    const product: Product = {id : 4, name: "kelvin", price: 30}
    const miProductoAPedir = 1;
    // If you want to test the functions, here are the calls
    // await getProduct(1);
    // await createProduct(product);

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