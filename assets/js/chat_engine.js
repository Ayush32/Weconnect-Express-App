/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 class ChatEngine {
   constructor(chatBoxId, userEmail) {
     this.chatBox = $(`#${chatBoxId}`);
     this.userEmail = userEmail;
     this.socket = io.connect('http://localhost:5000');

     if(this.userEmail){
         this.connectHandler();
     }
   }

   connectHandler(){
       this.socket.on('connect', function(){
           console.log('connection established using sockets')
       });
   }

 }