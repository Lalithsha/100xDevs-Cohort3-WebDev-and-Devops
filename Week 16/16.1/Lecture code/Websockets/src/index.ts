import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port:8081})


wss.on("connection",function(socket){
    console.log("user connected");
    // socket.send("Hello");

    /* setInterval(()=>{
        socket.send("Current price of solana is: "+ Math.random())
    },500)
  
    socket.on("message",function(event){
        console.log(event.toString());
    }) */

    socket.on("message", function(event){
        if(event.toString()==="ping"){
            socket.send("Pong");
        }
    })
        
    
})


