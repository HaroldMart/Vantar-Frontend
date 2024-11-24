import { forwardRef } from "react"

import { cn } from "@/lib/utils"
import { InputProps } from "@shared/interfaces"

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id , type, label, placeholder, error, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        {
          label && <label htmlFor={id}>{label}</label>
        }
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            `flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 ${error && 'ring-2 ring-red-700 ring-offset-2'} focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300`,
          )}
          ref={ref}
          {...props}
        />
        {
          error && <div>
            <p className="font-bold text-sm text-red-600">{error}</p>
          </div>
        }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
