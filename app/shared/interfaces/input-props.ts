import { HTMLInputTypeAttribute } from "react";

export interface InputProps {
    id: string;
    label?: string;
    placeholder: string;
    error?: string;
    type?: HTMLInputTypeAttribute;
}