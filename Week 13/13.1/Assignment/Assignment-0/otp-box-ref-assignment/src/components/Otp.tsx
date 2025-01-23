/* // import { Button } from "./Buttons";
import { Button } from "./Button";
import { useRef, useState } from "react";

// 1, 2, 3, 6, 10
export function Otp({ number }) {
    const ref = useRef(Array(number).fill(0));

    const [disabled, setDisabled] = useState(true);
    const [inputBoxVal, setInputBoxVal] = useState(Array(number).fill(""));

    return <div className="flex justify-center">
        
        {Array(number).fill(1).map((x, index) => <SubOtpBox inputBoxVal={inputBoxVal} setInputBoxVal={setInputBoxVal} reference={(e) => ref.current[index] = e} key={index} onDone={() => {
            console.log(ref)
            console.log(index)
            if (index + 1 >= number) {
                return
            }
            ref.current[index + 1].focus();
        }} goBack={() => {
            if (index == 0) {
                return
            }
            setInputBoxVal(inputBoxVal.push(""))
            ref.current[index - 1].focus();
        }} />)}

        <br />
        <Button disabled={disabled}>Sign up</Button>
    </div>
}

function SubOtpBox({
    reference, onDone, goBack, setInputBoxVal, inputBoxVal
}) {
    return <div>
        <input value={inputBoxVal} ref={reference} onKeyUp={(e) => {
            if (e.key == "Backspace") {
                goBack()
            }
        }} onChange={(e) => {
            const val = e.target.value

            if (val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val  == "9") {
                setInputBoxVal(inputBoxVal.push((e)=>e.target.value));
                onDone()
            } 
        }} type="text" className="m-1 w-[40px] h-[50px] rounded-xl bg-blue-500 outline-none px-4 text-white"></input>
    </div>
} */

import Input from "./Input";
import type { FormEvent, KeyboardEvent } from "react";
import React, { useRef, useState } from "react";

interface InputCodeProps {
  length: number;
  loading: boolean;
  onComplete: (code: string) => void;
}

function InputCode({ length, loading, onComplete }: InputCodeProps) {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const processInput = (e: FormEvent<HTMLInputElement>, slot: number) => {
    const num = (e.target as HTMLInputElement).value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1]?.focus();
    }
    if (newCode.every((num) => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.key === "Backspace" && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center w-full gap-2 text-white ">
      {code.map((num, idx) => (
        <div className="text-green-800 " key={idx}>
          <Input
            autoFocus={!code[0].length && idx === 0}
            className="px-3 py-5 rounded-xl w-10 h-12 font-semibold text-base text-center bg-white/10 text-white focus-visible:ring-transparent outline-none border-2 border-white/10"
            defaultValue={1}
            inputMode="numeric"
            key={idx}
            maxLength={1}
            onChange={(e) => {
              processInput(e, idx);
            }}
            onKeyUp={(e) => {
              onKeyUp(e, idx);
            }}
            readOnly={loading}
            ref={(ref) => (inputs.current[idx] = ref)}
            type="text"
            value={num}
          />
        </div>
      ))}
    </div>
  );
}

export default InputCode;