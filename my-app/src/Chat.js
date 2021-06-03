import React, { useState } from 'react';
import './chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';


function Chat({ messages }){
    const [ input, setInput ] = useState("");
    
const sendMessage = async(e) => {
      //stops refresh while typing
        e.preventDefault();    
        await axios.post("/messages/new",{ 
        message: input,
        name: "demo",
        timestamp:"justnow",
        received:true,
        });
        
        setInput("");
    };
    return(
    <div className='Chat'>
     <div className='chat__header'>
     <Avatar src='https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102'/>    
        <div className='chat__headerInfo'>
        <h3>Room Name</h3>
        <p>Last seen at...</p>
        </div>
        
        <div className='chat__headerRight'>
        <IconButton>
        <SearchOutlined />
        </IconButton>
           <IconButton>
        <AttachFile />
        </IconButton>
           <IconButton>
        <MoreVert />
        </IconButton>
        </div>
        </div>
   
 <div className='chat__body'>
        {messages.map((message) =>(
        <p 
        className={"chat__message " + (message.received ? "chat__receiver" : "")}>
        <span className='chat__name'>{message.name}</span>
        {message.message}
        <span className='chat__timeStamp'>{message.timestamp}</span>
        </p>
        ))}
        
       
        </div>
<div className='chat__footer'>
    <IconButton>
    <InsertEmoticonIcon  />
    </IconButton>
 
    <form>
    <input 
      value={input} 
      onChange = {(e) => setInput(e.target.value)} 
      type='text' 
      placeholder="Type Your Message" />
        <button onClick={sendMessage} type="Submit">Send a Messsage</button>
    </form>
    <IconButton>
    <MicIcon />
    </IconButton>

    </div>
    </div>
    );
}
export default Chat;