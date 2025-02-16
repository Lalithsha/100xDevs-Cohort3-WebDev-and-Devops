import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port:8081})


wss.on("connection",function(socket){
    console.log("hello");
    // socket.send("Hello");

    setInterval(()=>{
        socket.send("Current price of solana is: "+ Math.random())
    },500)
  
    socket.on("message",function(event){
        console.log(event.toString());
    })
    
})


