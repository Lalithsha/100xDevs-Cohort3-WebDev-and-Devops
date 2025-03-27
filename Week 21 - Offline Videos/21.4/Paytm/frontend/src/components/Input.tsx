import React from "react";

export type InputProps = {
  inputName: string;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  type?: string;
  id?: string;
};

function Input({ inputName, placeholder, ref, id, type }: InputProps) {
  return (
    <div className="flex flex-col pl-2 pr-2 mr-2 ml-2 mb-2">
      <span className="font-semibold text-sm pb-2 pt-2">{inputName}</span>
      <input
        className="w-82 border border-gray-300 rounded-md p-2"
        type={type || "text"}
        placeholder={placeholder}
        ref={ref}
        id={id}
      />
    </div>
  );
}

export default Input;
