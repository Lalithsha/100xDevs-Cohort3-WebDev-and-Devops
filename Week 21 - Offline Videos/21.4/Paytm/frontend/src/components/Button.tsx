// import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "rounded-md border-white bg-black text-white text-sm font-semibold py-2 px-4 shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer",
  {
    variants: {
      size: {
        small: "w-24",
        medium: "w-40",
        large: "w-82",
      },
    },
    defaultVariants: {
      size: "large",
    },
  }
);

export type ButtonProps = VariantProps<typeof buttonVariants> & {
  buttonName: string;
  size?: "small" | "medium" | "large";
  onClick: () => void;
};

function Button({ buttonName, size, onClick }: ButtonProps) {
  return (
    <div>
      <button className={buttonVariants({ size })} onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
}

export default Button;
