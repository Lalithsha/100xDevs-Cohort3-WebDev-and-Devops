/* 
export const Input = ({
    onClick,
    type,
    placeholder
}) => {
    // clsx, cx
    return <span onClick={onClick} className={`p-8 text-4xl px-2 py-2 text-white cursor-pointer bg-blue-500 rounded-2xl`}>
        <input type={type} placeholder={placeholder} className="bg-blue-500 outline-none"></input>
    </span>
} */

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string; // Custom class names for styling
  inputMode?: "text" | "numeric"; // Input mode (e.g., numeric for OTPs)
  loading?: boolean; // Disable input when loading
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputMode = "text", loading = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`px-3 py-2 rounded border outline-none focus:ring-2 focus:ring-blue-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        } ${className || ""}`}
        inputMode={inputMode}
        readOnly={loading}
        {...props} // Spread remaining props to allow customization
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
