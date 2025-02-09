import { ReactElement } from "react";

type variants = "primary" | "secondary";

export interface ButtonProps{
    variant: variants
    size: "sm"|"md"|"lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?:React.ReactNode;
    onClick: ()=>void;
}

const variantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}

const sizeStyles = {
  "sm":"py-1 px-2",
  "md":"py-2 px-4",
  "lg":"py-4 px-6"
}

const defaultStyles = "rounded-md shadow-md flex font-light items-center"

export const Button =(({variant, size, text, startIcon, endIcon}: ButtonProps)=>{
  return (
    <button className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]}`} >
      {startIcon ? <div className="pr-2" >{startIcon}</div>:null } {text} {endIcon}
    </button>
  )
})


