import { Product } from "./type"

interface ProductInterface {
    getAllProducts() : Product[]
    getProduct() : Product,
    createProduct() : Product,
    updateProduct() : boolean,
    deleteProduct() : boolean
}