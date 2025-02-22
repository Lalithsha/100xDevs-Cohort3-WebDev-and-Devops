import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["Hi there", "hellew"]);
  const wsRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8081");
    ws.onmessage = async (event) => {
      console.log(event.data);
      const eventMessage = await event.data.text(); // Convert Blob to string
      setMessages((m) => [...m, eventMessage]);
    };
    wsRef.current = ws;

    // Hard coding the room joining logic
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );

      return () => {
        ws.close();
      };
    };
  }, []);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90vh]">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col">
            <span className="bg-white text-black rounded-xl p-4 m-8">
              {message}
            </span>
          </div>
        ))}
      </div>
      <div className="max-w-7xl  bg-white flex">
        <input ref={inputRef} type="text" className="flex-1 p-4" />
        <button
          onClick={() => {
            const message = inputRef.current?.value;
            wsRef.current.send(
              JSON.stringify({
                type: "chat",
                payload: message,
              })
            );
          }}
          className="bg-purple-600 text-white p-4 rounded-xl"
        >
          send message
        </button>
      </div>
    </div>
  );
}

export default App;
