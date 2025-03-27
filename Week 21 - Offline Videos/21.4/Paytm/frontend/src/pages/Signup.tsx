import React, { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Signup() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center justify-center p-4 m-4 h-screen bg-gray-100 rounded-md">
      <div className="flex flex-col items-center justify-center  rounded-md shadow-md bg-white p-4 m-4 ">
        <div className="flex flex-col items-center justify-center  p-2 m-2">
          <h2 className="font-bold text-4xl py-2">Sign up</h2>
          <h4>Enter your information to create an account</h4>
        </div>
        <div>
          <Input placeholder="John" inputName="First name" ref={firstnameRef} />
        </div>
        <div>
          <Input inputName="Last name" placeholder="Doe" ref={lastnameRef} />
        </div>
        <div>
          <Input
            type={"email"}
            placeholder="johnedoe@example.com"
            inputName="Email"
            ref={emailRef}
          />
        </div>
        <div>
          <Input type={"password"} inputName="Password" ref={passwordRef} />
        </div>
        <div className="my-4">
          <Button
            buttonName="Signup"
            size={"large"}
            onClick={() => console.log("signup button clicked")}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
