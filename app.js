const express = require('express');
const socketIo = require('socket.io');


const app = express();
const port = 8080;
const userSocketLookup = new Map();


app.use(express.static(__dirname+'/public'));


const server = app.listen(port);
const io = socketIo(server,{
    cors:{
        origin:'*'
    }
});

io.on('connection',(socket)=>{
    let userName = socket.handshake.query.userName;
    if(userName){
        userSocketLookup.set(userName,socket.id)
    }
    io.emit('onlineUsersList',Array.from(userSocketLookup.keys()).filter(name=>name!==userName));
})