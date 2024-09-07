"use client";

import { useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { users, business, products } from "../../../DATABASE";

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
          <BiHome size={36} className="fill-blue-700" />
        </div>
        <h1 className="text-4xl font-semibold text-[#795BF9]">
          Pagina de inicio
        </h1>

        <h4>--- Lista de usuarios ---</h4>
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
        })}
      </div>
    </>
  );
}
