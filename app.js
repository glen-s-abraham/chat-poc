const express = require('express');
const socketIo = require('socket.io');
const cron = require("node-cron");

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
    socket.emit('onlineUsersList',Array.from(userSocketLookup.keys()).filter(name=>name!==userName));
})

cron.schedule("*/5 * * * * *", ()=>{
    let users = Array.from(userSocketLookup.keys());
    
        if(users.length>0){    
            users.forEach(user=>{
                let userSocket = io.sockets.sockets.get(userSocketLookup.get(user));
                if(!userSocket){
                    userSocketLookup.delete(user);
                    console.log(`removed inactive user: ${user}`)
                }
            })
        }
});

