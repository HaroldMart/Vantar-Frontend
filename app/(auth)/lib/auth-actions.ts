"use server";

import axios from "axios";
import { permanentRedirect, redirect } from "next/navigation";
import { cookies } from "next/headers";

import { API_URL } from "@shared/constants";
import {
  LoginCredentials,
  Tokens,
  ResetPassword,
  SingupCredentials,
} from "@auth/lib/interfaces";

const url: string = API_URL + "auth";

export async function login(credentials: LoginCredentials) {
  try {
    const res = await axios.post<Tokens>(url + "/login", credentials);
    cookies().set("access_token", res.data.access_token);
    cookies().set("refresh_token", res.data.refresh_token);
  } catch (err: any) {
    const status: number = err.response.data.statusCode;

    if (status === 400) return "Email o contraseña incorrectos.";
    if (status === 404) return "Usuario no encontrado.";
    if (status === 406) return "Email o contraseña incorrectos.";

    return "Error desconocido";
  }

  redirect("/");
}

export async function singUp(credentials: SingupCredentials) {
  try {
    await axios.post<string>(API_URL + "users", credentials);
    return login(credentials);
  } catch (err: any) {
    const status: number = err.response.data.statusCode;

    if (status === 400) return "Error de validación.";
    if (status === 406) return "Ya estás logueado.";
    if (status === 429) return "Se agotaron los intentos, intentalo más tarde.";

    return "Error desconocido";
  }
}

export async function refresh() {
  const token: string = cookies().get("refresh-token")?.value ?? "";

  if (!token) permanentRedirect("/login");

  try {
    const res = await axios.post<Tokens>(url + "/refresh", token, {
      headers: { token: token },
    });
    const { access_token, refresh_token } = res.data;

    cookies().set("acces_token", access_token);
    cookies().set("refresh_token", refresh_token);
  } catch (err: any) {
    const status: number = err.response.data.statusCode;

    if (status === 401) return "Desautorizado.";
    if (status === 404) return "Sesión caducada.";
    if (status === 406) return "Token invalido.";

    return "Error desconocido";
  }
}

export async function logout() {
  const token: string = cookies().get("refresh-token")?.value ?? "";

  try {
    await axios.get<string>(url + "/logout", {
      headers: { token: token },
    });
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  } catch (err: any) {
    const status: number = err.response.data.statusCode;

    if (status === 401) return "Desautorizado.";
    if (status === 406) return "Token invalido.";
    if (status === 429) return "Se agotaron los intentos, intentalo más tarde.";

    return "Error desconocido";
  }

  redirect('/login');
}

export async function forgotPassword(email: string) {
  try {
    await axios.post<{ message: string }>(url + "/forgot", {
      email: email,
    });
    return "Si la dirección que dijitaste es correcto, te estara llegando un correo para la recuperación.";
  } catch (err: any) {
    return "Demasiados intentos, intentalo despues.";
  }
}

export async function activateAccount(token: string) {
  try {
    await axios.get<{ message: string }>(url + "/activate", {
      params: { token: token },
    });
    return { success: true };
  } catch (err: any) {
    const status: number = err.response.data.statusCode;

    if (status === 406) return { message: "Error al activar la cuenta, token invalido." };
    if (status === 429) return { message: "Se agotaron los intentos, intentalo más tarde." };

    return { message: "Error desconocido." };
  }
}

export async function resetPassword(credentials: ResetPassword) {
  const { password, token } = credentials;

  try {
    await axios.post<{ message: string }>(
      url + "/reset",
      {
        password: password,
      },
      {
        params: { token: token },
      }
    );
  } catch (err: any) {
    const status: number = err.response.data.statusCode;

    if (status === 406) return "Error al recuperar la cuenta, token invalido.";
    if (status === 429) return "Se agotaron los intentos, intentalo más tarde.";

    return "Error desconocido.";
  };

  redirect("/login");
}
