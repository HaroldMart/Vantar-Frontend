"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { businessService } from "../lib/service";
import { GenericService } from "../../shared/generic_service";
import { Business } from "../lib/core";

const businessApiService = new businessService(new GenericService());

export default function SelectBusiness() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  // const [allBusinesses, setAllBusinesses] = useState([]);

  const fetchBusinesses = async () => {
    try {
      const businesses = await businessApiService.getAll();
      if (typeof businesses === "string") {
        console.error(businesses);
      } else {
        setBusinesses(businesses);
      }
    } catch (error) {
      console.error("Error obteniendo negocios:", error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <>
      <div className="flex flex-col flex-1 gap-3 justify-center items-center h-screen bg-gray-100">
        <ul>
          {businesses.map((business) => (
            <li className="" key={business.id}>
              <Link href={`/${business.id}`}>{business.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
