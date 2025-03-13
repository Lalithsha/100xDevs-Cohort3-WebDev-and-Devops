interface PropType {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({ placeholder, onChange }: PropType) {
  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
      type="text"
    ></input>
  );
}
