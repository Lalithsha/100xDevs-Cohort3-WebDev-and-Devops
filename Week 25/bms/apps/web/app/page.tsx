import { client } from "@repo/db/client";

export default async function Home() {
  const user = await client.user.findFirst();

  return (
    <div>
      <div>{user?.username}</div>
      <div>{user?.password}</div>
    </div>
  );
}
