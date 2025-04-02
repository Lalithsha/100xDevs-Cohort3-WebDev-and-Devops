import { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function signin() {
    const username = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username, password);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        { username, password }
      );
      if (response) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error is :", error);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signin();
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 m-4 h-screen rounded-md">
      <div className="flex flex-col items-center justify-center  rounded-md shadow-md bg-white p-4 m-4 ">
        <div className="flex flex-col items-center justify-center  p-2 m-2">
          <h2 className="font-bold text-4xl py-2">Sign in</h2>
          <p>Enter your information to create an account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type={"text"}
              placeholder="johnedoe@example.com"
              inputName="Email"
              ref={emailRef}
            />
          </div>
          <div>
            <Input type={"password"} inputName="Password" ref={passwordRef} />
          </div>
          <div className="my-4">
            <Button buttonName="Signup" size={"large"} type={"submit"} />
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
