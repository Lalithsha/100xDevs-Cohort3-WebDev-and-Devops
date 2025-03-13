"use client";
import { TextInput } from "@repo/ui/text-input";

export default function ChatRoom() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div>Hello world</div>
      <div>
        <TextInput
          placeholder="Enter message..."
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
