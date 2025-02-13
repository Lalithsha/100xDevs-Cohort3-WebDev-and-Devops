import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";
import { useNavigate } from "react-router-dom";

function Signup() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username + " " + password);
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });
    // alert("you have signed up");
    navigate("/dashboard");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border-gray-200 shadow-2xl min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button
            loading={false}
            variant="primary"
            size="md"
            text="Signup"
            onClick={signup}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export const onChange = () => {};

export default Signup;
