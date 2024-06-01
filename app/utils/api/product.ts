import { json } from "stream/consumers";
import { Product } from "../models";

const api = "https://jsonplaceholder.typicode.com/";

export async function getProduct(id : number) {
    try {
        const url = api + `todos/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(`A GET request was made to the endpoint: ${url}`)
        console.log(data)

    } catch(err) {
        console.log("There was an error during the request")
        console.log(err)
    }
}

export async function createProduct(product : Product) {
    try {
        const url = api + `posts`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type":  "application/json"
            },
            body: JSON.stringify(product), // Here I'm converting the product type into json for the request
            // The console log will show another id, but it's because the atribute in the api is userId, not id
        });

        const data = await response.json();
        console.log(`A POST request was made to the endpoint: ${url}`)
        console.log(data)

    } catch(err) {
        console.log("There was an error during the request")
        console.log(err)
    }
}