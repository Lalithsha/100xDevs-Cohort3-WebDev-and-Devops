import { WebSocketServer, WebSocket } from "ws";

const wss = new  WebSocketServer({port: 8081})



// Intial basic way to create chat application

// let userCount = 0;
// let allSockets: WebSocket[] = [];

/* wss.on("connection", (socket)=>{
    allSockets.push(socket);
    userCount= userCount+1;
    console.log("Users connected #"+ userCount)
    
    socket.on("message",(message)=>{
        allSockets.map((currSocket)=>{
            currSocket.send(message.toString());
        })
        console.log("message received "+message.toString());        
    })

    socket.on("disconnect",()=>{
        allSockets = allSockets.filter( x => x != socket)
    })
    
})
 */


interface User{
    socket: WebSocket;
    room: string;
}

/* Using socket we compare the connections and if connection match then we get the roomId. 
and if they match then send that socket message which is being shared by any user from that ws server */

let allSockets: User[] = [];

wss.on("connection", (socket)=>{
    
    console.log("Users connected")
    
    socket.on("message",(message)=>{
        const paresedMessage = JSON.parse(message.toString());
        if(paresedMessage.type ==="join"){
            allSockets.push({
                socket,
                room: paresedMessage.payload.roomId
            })
        }

        if(paresedMessage.type == 'chat'){
             const currentRoom = allSockets.find(x=>x.socket==socket);
             console.log(paresedMessage.payload.message, "send from server")
             currentRoom?.socket.send(paresedMessage.payload.message);

             for(let i = 0; i < allSockets.length; i++){
                // if(allSockets[i].room==currentRoom?.room)
                if(allSockets[i].room==currentRoom?.room){
                    allSockets[i].socket.send(paresedMessage.payload.message);
                }
             }
             
        }
        
        
    })

    /* socket.on("disconnect",()=>{
        allSockets = allSockets.filter( x => x != socket)
    }) */
    
})








