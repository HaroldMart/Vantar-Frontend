import { Loader2 } from "lucide-react";
import { ButtonProps } from "@shared/interfaces";

export function Button({ isLoading, label, secondary }: ButtonProps) {
  return (
    <button
      disabled={isLoading}
      className={`rounded-md p-3 ${secondary ? 'bg-purple-100' : 'bg-purple-700'} flex gap-4 justify-center items-center hover:bg-purple-600 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <p className={`${secondary ? 'text-purple-700' : 'text-purple-100'} text-lg`}>{label}</p>}
    </button>
  );
}
