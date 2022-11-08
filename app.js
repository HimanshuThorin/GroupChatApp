const express = require("express");

const app = express();
const http = require("http");
const server = http.createServer(app); // a new server using socket which workes over the node/express server
const {Server} = require("socket.io"); //socket.io serves client automatically
const io = new Server(server);   // a socket is an endpoint of communication bw 2 devices. eg, two browsers/two mobile phones can be two diff sockets.

app.get('/',function(req, res){
    res.sendFile(__dirname + "/index.html")
})


io.on("connection", function(socket){
    socket.on("chat message", function(message, user){
        // console.log("message: " + message)
        io.emit("chat message", user.toUpperCase() + "::----->>>>  " + message)
    })
})

io.on("connection", function(socket){
    socket.on("connectUser", function(userName){
        io.emit("joinUser", userName + " has JOINED the chat")
    })
    socket.on("disconnect", function(){
        io.emit("leftUser", "user has left the chat")
    })
})


server.listen(5000,function(){
    console.log("server listening to port 5000")
})