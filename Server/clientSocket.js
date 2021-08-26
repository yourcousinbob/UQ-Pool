/* Reference at:
https://dev.to/kris/buiding-chat-app-with-react-native-and-socket-io-4p8l
*/

import io from "socket.io-client";

constructor(props) {
   super(props);
   this.state = {
      users: []
   };
}

componentDidMount() {
    
   this.socket = io("http://127.0.0.1:7777");
   
    this.socket.on("login", user => {
          this.setState({ users: [...this.state.users, body]   
     });
  });

  this.socket.on("logout", user => {
});

  this.socket.on("location", user => {
});

  this.socket.on("request", user => {
});

  this.socket.on("cancel", user => {
});
  
  this.socket.on("accept", user => {
});
  
  this.socket.on("reject", user => {
});
  
}
