"use client";

import { BiSolidHome } from "react-icons/bi";
import { users, business, products } from "../../../DATABASE";
import Link from "next/link";

export type user = {
  id: string;
  name: string;
};

export default function Home() {
    const MY_USER = users[0];
    const user_list = users;

    function my_business_component(id: string) {
        return (
            <ul>
                {products.map((item) => {
                    if (item.business_id === id) {
                        return <li key={item.id}>{item.name}</li>;
                    }
                    return null;
                })}
            </ul>
        );
    }

    return (
        <>
            <div className="flex flex-col flex-1 gap-3 justify-center items-center h-screen bg-gray-100">
                <div className="flex justify-center items-center p-6 bg-blue-100 rounded-full">
                    <BiSolidHome size={36} className="fill-blue-700" />
                </div>
                <h1 className="text-4xl font-semibold text-[#795BF9]">
                    Pagina de inicio
                </h1>
                <Link href={"products"}>Ir a productos</Link>

                {/* <h4>--- Lista de usuarios ---</h4>
                {user_list.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}

                <hr />
                <h4>
                    --- Lista de negocios del usuario {MY_USER.name} con id {MY_USER.id}{" "}
                    ---
                </h4>
                {business.map((item) => {
                    if (item.user_id === MY_USER.id) {
                        return <div key={item.id}>{item.name}</div>;
                    }
                    return null;
                })}

                <hr />

                <h4>--- Lista de productos de los negocios de {MY_USER.name} ---</h4>
                {business.map((item) => {
                    if (item.user_id === MY_USER.id) {
                        return (
                            <div key={item.id}>
                                Negocio: {item.name}
                                {my_business_component(item.id)}
                            </div>
                        );
                    }
                    return null;
                })} */}
            </div>
        </>
    );
}

function get_business(MY_USER: user) {
  if (business != null) {
    const my_business = business.map((business) => {
      if (business.user_id == MY_USER.id) {
        const business_name = business.name;
        const business_products = products.map((product) => {
          if (product.business_id == business.id) {
            return product;
          }
        });
      }
    });
    return my_business
  } else {
    return "NO HAY NADA";
  }
}