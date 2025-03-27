import { ReactElement } from "react";

type variants = "primary" | "secondary";

export interface ButtonProps {
  variant: variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4 px-6",
};

const defaultStyles =
  "rounded-md shadow-md flex font-light items-center cursor-pointer";

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} ${defaultStyles} ${
        sizeStyles[size]
      } ${fullWidth ? "w-full items-center justify-center" : ""} ${
        loading ? "opacity-45" : ""
      }`}
      disabled={loading}
    >
      {startIcon ? <div className="pr-2">{startIcon}</div> : null} {text}{" "}
      {endIcon}
    </button>
  );
};

// Better approach.
/* const getButtonClasses = (
  variant: Variant,
  size: Size,
  fullWidth?: boolean,
  loading?: boolean
) => {
  const base = "rounded-md shadow-md flex font-light items-center cursor-pointer";
  const variants = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-200 text-purple-600",
  };
  const sizes = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-4 px-6",
  };

  return [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full justify-center" : "",
    loading ? "opacity-45" : "",
  ].join(" ");
};

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={getButtonClasses(variant, size, fullWidth, loading)}
      disabled={loading}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
      {endIcon}
    </button>
  );
};
 */
