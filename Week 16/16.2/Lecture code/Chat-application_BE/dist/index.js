"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8081 });
let allSockets = [];
wss.on("connection", (socket) => {
    console.log("Users connected");
    socket.on("message", (message) => {
        const paresedMessage = JSON.parse(message.toString());
        if (paresedMessage.type === "join") {
            allSockets.push({
                socket,
                room: paresedMessage.payload.roomId
            });
        }
        if (paresedMessage.type == 'chat') {
            const currentRoom = allSockets.find(x => x.socket == socket);
            console.log(paresedMessage.payload.message, "send from server");
            //  currentRoom?.socket.send(message);
            currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.socket.send(paresedMessage.payload.message);
            for (let i = 0; i < allSockets.length; i++) {
                // if(allSockets[i].room==currentRoom?.room)
                if (allSockets[i].room == (currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.room)) {
                    allSockets[i].socket.send(paresedMessage.payload.message);
                }
            }
        }
    });
    /* socket.on("disconnect",()=>{
        allSockets = allSockets.filter( x => x != socket)
    }) */
});
