/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
// changing the comment
 class ChatEngine
 {
   constructor(chatBoxId, userEmail) {
     this.chatBox = $(`#${chatBoxId}`);
     this.userEmail = userEmail;
     this.socket = io.connect('http://34.201.164.169:5000');

     if(this.userEmail){
         this.connectionHandler();
     }
   }

   connectionHandler(){
     let self  = this;
       this.socket.on('connect', function(){
           console.log('connection established using sockets')

           self.socket.emit('join_room',{
             user_email: self.userEmail,
             chatroom: 'WeConnect'
           });

           self.socket.on('user_joined', function(data){
             console.log('New User Joined ', data)
           })
       });

      //  change ::  send a message on clicking the send message button 

      $('#send-message').click(function(event){
         event.preventDefault();
        let message  =  $('#message').val();
        
       

        if(message!= ''){
          $('#message').val('');
          self.socket.emit('send_message',{
            message: message,
            user_email: self.userEmail,
            chatroom: 'WeConnect'
          })
        }
         
      })

      self.socket.on('receive_message',function(data){
        console.log('message received',data);

        let newMessage  = $('<li>');

        let messageType  = 'other-message';

        if(data.user_email == self.userEmail){
          messageType = 'self-message'
        }

        newMessage.append($('<span>',{
          html: data.message,
        }));
        // adding break line
        newMessage.append($('<br>'));
        newMessage.append($('<small>',{
          html: data.user_email
        }));
        newMessage.addClass(messageType)
        $('#message-list').append(newMessage);
          
      })
   }

 }