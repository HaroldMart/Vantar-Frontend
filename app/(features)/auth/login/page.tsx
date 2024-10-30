"use client";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import useAuthContext from "@/contexts/authContext";

function Page() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();
    const { login } = useAuthContext();

    const handleForm = async (event: FormEvent) => {
        event.preventDefault();

        const response = await fetch("http://localhost:2020/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorisation: "Bearer 'access_token'",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            return console.log("Error");
        }

        const tokens = await response.json();
        login(tokens);

        return router.push("/");
    };

    return (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1 className="mt-60 mb-30">Sign up</h1>
                <form onSubmit={handleForm} className="form">
                    <label htmlFor="email">
                        <p>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                        />
                    </label>

                    <label htmlFor="password">
                        <p>Contraseña</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="**********"
                        />
                    </label>
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}

export default Page;
