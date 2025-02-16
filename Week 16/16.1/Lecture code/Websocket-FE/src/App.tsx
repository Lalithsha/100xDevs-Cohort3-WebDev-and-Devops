import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const inputRef = useRef<HTMLInputElement>();

  function sendMessage() {
    const message = inputRef.current.value;

    socket?.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    setSocket(ws);

    ws.onmessage = (event) => {
      console.log(event.toString());
      alert(event.data);
    };
  }, []);
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
