import { json } from "stream/consumers";
import { Product } from "../core/type";

const api = "http://localhost:8000/"
// pnpm json-server --watch app\"(features)"\product\"(infrastructure)"\data.json --port 8000

// getting all products
export async function getAllProducts() {
    const method = "GET"
    try {
        const url = api + "products";
        const response = await fetch(url);
        const data = await response.json();
        console.log(`A GET request was made to the endpoint: ${url}`)
        // console.log(data);

        return data;

    } catch(err) {
        console.log(`There was an error during the ${method} request`)
        console.log(err);
    }
}

// // getting a product
// export async function getProduct(id : number) {
//     const method = "GET"
//     try {
//         const url = api + `posts/${id}`;
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(`A GET request was made to the endpoint: ${url}`)
//         console.log(data)

//     } catch(err) {
//         console.log(`There was an error during the ${method} request`)
//         console.log(err)
//     }
// }

// // creating a product
// export async function createProduct(product : Product) {
//     const method = "POST"
//     try {
//         const url = api + "posts";
//         const response = await fetch(url, {
//             method: method,
//             headers: {
//                 "Content-type":  "application/json"
//             },
//             body: JSON.stringify(product), // here I'm converting the product type into json for the request
//         });

//         const data = await response.json();
//         console.log(`A ${method} request was made to the endpoint: ${url}`)
//         console.log(data)

//     } catch(err) {
//         console.log(`There was an error during the ${method} request`)
//         console.log(err)
//     }
// }

// // updating a product
// export async function updateProduct(id : number, product : Product) {
//     const method = "PUT"
//     try {
//         const url = api + `posts/${id}`;
//         const response = await fetch(url, {
//             method: method,
//             headers: {
//                 "Content-type":  "application/json"
//             },
//             body: JSON.stringify(product), // here I'm converting the product type into json for the request
//         });

//         const data = await response.json();
//         console.log(`A ${method} request was made to the endpoint: ${url}`)
//         console.log(data)

//     } catch(err) {
//         console.log(`There was an error during the ${method} request`)
//         console.log(err)
//     }
// }

// // deleting a product
// export async function deleteProduct(id : number) {
//     const method = "DELETE"
//     try {
//         const url = api + `posts/${id}`;
//         const response = await fetch(url, {
//             method: method,
//             headers: {
//                 "Content-type":  "application/json"
//             }
//         });

//         const data = await response.json();
//         console.log(`A ${method} request was made to the endpoint: ${url}`)
//         console.log(data)

//     } catch(err) {
//         console.log(`There was an error during the ${method} request`)
//         console.log(err)
//     }
// }