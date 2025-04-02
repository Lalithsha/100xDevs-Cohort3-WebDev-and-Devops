import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username + " " + password);
    await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    alert("you have signed in");
    navigate("/dashboard");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button
            loading={false}
            variant="primary"
            size="md"
            text="Signin"
            onClick={signin}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export const onChange = () => {};

export default SignIn;
