import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

function SignIn() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" onChange={onChange} />
        <Input placeholder="Password" onChange={onChange} />
        <div className="flex justify-center pt-4">
          <Button
            loading={false}
            variant="primary"
            size="md"
            text="Signin"
            onClick={onChange}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export const onChange = () => {};

export default SignIn;
