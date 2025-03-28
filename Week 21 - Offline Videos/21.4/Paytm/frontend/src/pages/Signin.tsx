import { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function signUp() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email, password);
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 m-4 h-screen rounded-md">
      <div className="flex flex-col items-center justify-center  rounded-md shadow-md bg-white p-4 m-4 ">
        <div className="flex flex-col items-center justify-center  p-2 m-2">
          <h2 className="font-bold text-4xl py-2">Sign in</h2>
          <p>Enter your information to create an account</p>
        </div>
        <form action="">
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
            <Button buttonName="Signup" size={"large"} onClick={signUp} />
          </div>
        </form>
        <h6>
          Don't have an account?{" "}
          <span className="border-b-2 cursor-pointer">Sign Up </span>
        </h6>
      </div>
    </div>
  );
}

export default Signin;
