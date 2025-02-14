import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      link,
      type,
      title,
    });

    onClose();
  }

  return (
    <div>
      {open && (
        <div>
          {" "}
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen  fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded-md">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon size="md" />
                  </div>
                </div>
                <div className="">
                  <Input ref={titleRef} placeholder="title" />
                  <Input ref={linkRef} placeholder={"link"} />
                </div>
                <h1>Type</h1>
                <div className="flex p-4 gap-2 justify-center pb-2">
                  <Button
                    text="Youtube"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Youtube);
                    }}
                    size={"md"}
                  ></Button>
                  <Button
                    text="Twitter"
                    size="md"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                  ></Button>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    text="Submit"
                    onClick={addContent}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateContentModal;

/* export function Input({
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
} */

export const onChange = () => {};
