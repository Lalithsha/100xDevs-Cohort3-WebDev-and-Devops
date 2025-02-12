export function Input({
  onChange,
  placeholder,
}: {
  onChange: () => void;
  placeholder: string;
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-4 rounded-lg border border-gray-300 m-2"
        onChange={onChange}
      />
    </div>
  );
}

export const onChange = () => {};
