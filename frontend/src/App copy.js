import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzZlMjAxMTZjMDNlNmE5ZmRmMDgxZDgiLCJpYXQiOjE2NjgxNjE1NTM2MzAsImV4cCI6MTY2ODc2NjM1MzYzMCwidHlwZSI6ImFjY2VzcyJ9.3-OGvyY_La05dy2uOKwWZe74hnyfMby73UkoSRL-jB4"

const socket = io("localhost:3200/room", {
  query:{
    token
  }
})

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    socket.on('connect', (a) => {
      setIsConnected(true);
      socket.emit("get_all", (res) => {
        console.log(res);
      })

      // socket.emit("create",{ name: "room-5"}, (res) => {
      //   console.log(res);
      // })

      socket.emit("join", "room-1", (res) => {
        console.log(res);
      })

      socket.emit("get_messages", "room-1", 0, (res) => {
        console.log(res);
        setMessages(res.messages)
      })
    });

    socket.on('joind', (room) => {
      
    })

    socket.on("connect_error", (err) => {
      console.log(err); // prints the message associated with the error
    });

    socket.on('data', function (data) {
      console.log(data);
    })

    socket.on('error', function (error) {
      console.log(error);
    })

    socket.on("message", (message) => {
      console.log(message);
      setMessages((last) => last.concat(message))
    })

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  const HandleClick = () => {

    socket.emit("send_message", input, (res) => {
      console.log(res);
    })
  }
  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
      <div className="messages">
        {messages && messages.map(message => (
          <p key={message._id} >|{message.auther.name}|  == {message.text}</p>
        ))}
      </div>
      <div className='user-input'>
        <input type="text"
          value={input}
          onChange={(event)=>{
            setInput(event.target.value)
          }}
        />
        <button onClick={HandleClick}>Send</button>
      </div>
    </div>
  );
}

export default App;