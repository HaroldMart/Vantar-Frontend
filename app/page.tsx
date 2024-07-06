import { BiDislike } from "react-icons/bi";
import Link from "next/link";
import Button from "@/app/components/UI/button";
import Input from "@/app/components/UI/input";
import { FiArrowLeft, FiArrowRight, FiArrowUp } from 'react-icons/fi'; // Importando algunos iconos como ejemplo
import { FaArrowRightFromBracket } from "react-icons/fa6";


import "@/app/global.css";


// export function Button() {
//   return (
//     <button className="button-example">
//       Label
//     </button>
//   )
// }

export default function Page() {
  return (
    <div className="flex flex-col items-center space-y-4 p-10 w-96">
      <div className="w-full">
        <Input label="Username" placeholder="Enter your username" fullWidth={true} />
        <Input label="Email" placeholder="Enter your email" fullWidth={true} />
        <Input label="Password" placeholder="Enter your password" fullWidth={true} />
      </div>

      <Button fullWidth={true}>
        Label
      </Button>
    </div>
  )
}