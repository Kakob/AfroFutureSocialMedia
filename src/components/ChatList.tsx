import ChatRoom from "./ChatRoom";
import React, { useState } from "react";


export const ChatList = () => {
   const [isChatVisible, setChatVisibility] = useState(false);
   
   const handleDivClick = () => {
    setChatVisibility(true)
   }
   
   return(
    <div className="chatContainer">
        
        <div className="chatChild" onClick={handleDivClick}>
            <p>Chat with John</p>
        </div>
        <div  className="chatChild">
            {isChatVisible && <ChatRoom />}
        </div>

    </div>
    )
    
   };
   