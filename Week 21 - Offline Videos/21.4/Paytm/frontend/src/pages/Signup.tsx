import { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Signup() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function signUp() {
    const firstname = firstnameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(firstname, lastname, email, password);
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 m-4 h-screen rounded-md">
      <div className="flex flex-col items-center justify-center  rounded-md shadow-md bg-white p-4 m-4 ">
        <div className="flex flex-col items-center justify-center  p-2 m-2">
          <h2 className="font-bold text-4xl py-2">Sign up</h2>
          <p>Enter your information to create an account</p>
        </div>
        <form action="">
          <div>
            <Input
              placeholder="John"
              inputName="First name"
              ref={firstnameRef}
            />
          </div>
          <div>
            <Input
              inputName="Last name"
              type={"text"}
              placeholder="Doe"
              ref={lastnameRef}
            />
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
            <Button buttonName="Signup" size={"large"} onClick={signUp} />
          </div>
        </form>
        <h6>
          Already have an account?{" "}
          <span className="border-b-2 cursor-pointer">Login </span>
        </h6>
      </div>
    </div>
  );
}

export default Signup;
