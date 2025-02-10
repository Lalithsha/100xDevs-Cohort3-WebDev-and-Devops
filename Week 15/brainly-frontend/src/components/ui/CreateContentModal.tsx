import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";

function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-red-200 fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded-md">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon size="md" />
                </div>
              </div>
              <div className="">
                <Input placeholder="title" onChange={onChange} />
                <Input placeholder={"link"} onChange={onChange} />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="md"
                  text="Submit"
                  onClick={onChange}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateContentModal;

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
