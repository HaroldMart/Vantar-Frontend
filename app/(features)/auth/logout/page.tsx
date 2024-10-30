"use client";

import { useEffect } from "react";
import useAuthContext from "@/contexts/authContext";
import { redirect } from "next/navigation";

export default function Page() {
    const { logout } = useAuthContext();

    useEffect(() => {
        logout();
        redirect("/auth/login");
    }, [logout]);

    return null;
}
