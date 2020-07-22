/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
module.exports.chatSockets = function(socketServer){
   let io =  require('socket.io')(socketServer);
   io.sockets.on('connection', function(socket){
       console.log('new connection received', socket.id);

       socket.on('disconnect', function(){
           console.log('socket disconnected')
       });

       socket.on('join_room', function(data){
           console.log('Joining request rec.', data)
           socket.join(data.chatroom);
        //    push notification if new one join the chatroom
           io.in(data.chatroom).emit('user_joined', data);
       })
        socket.on("send_message", function (data) {
          io.in(data.chatroom).emit("receive_message", data);
        });
   })
}