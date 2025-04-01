import { useState } from "react";
import Button from "./Button";

function Users() {
  const [users, setUsers] = useState([
    {
      firstname: "Lalith",
      lastname: "Sharma",
      _id: "1",
    },
  ]);

  return (
    <div className="p-2 m-2 flex flex-col">
      <div className="flex flex-col font-semibold text-lg ">Users</div>
      <div className="flex flex-col my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-ful px-2 py-1 border-gray-400 border-1 rounded-md"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
}

function User({
  user,
}: {
  user: { firstname: string; lastname: string; _id: string };
}) {
  return (
    <div className="flex flx-row justify-between">
      <div className="flex">
        <div className="rounded-full bg-slate-200 h-12 w-12 justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl items-center">
            {user.firstname[0]}
          </div>
        </div>
        <div className="flex flex-row justify-center h-full items-center">
          <div>
            {user.firstname} {user.lastname}
          </div>
        </div>
      </div>

      <div className="flex flex-row h-full justify-center items-center">
        <Button
          size={"medium"}
          buttonName={"Send Money"}
          onClick={() => console.log("Hello world")}
        />
      </div>
    </div>
  );
}

export default Users;
