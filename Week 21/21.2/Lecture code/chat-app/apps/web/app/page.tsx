"use client";
import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  // defint a state for roomId'
  const [roomId, setRoomId] = useState<string>();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <input type="text" placeholder="Room Id" /> */}
        <TextInput
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          placeholder="Room Id"
        ></TextInput>
        <button
          onClick={() => {
            router.push(`/chat/${roomId}`);
          }}
        >
          Join room
        </button>
      </div>
    </div>
  );
}
