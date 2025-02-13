export type InputProps = { placeholder: string; ref?: any };

export function Input({ placeholder, ref }: InputProps) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-4 rounded-lg border border-gray-300 m-2"
        ref={ref}
      />
    </div>
  );
}

export const onChange = () => {};
