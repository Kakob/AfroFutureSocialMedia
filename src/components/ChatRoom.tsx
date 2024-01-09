import React, { createRef, useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
    Timestamp,
    getDocs,
  } from "firebase/firestore";
import { db } from "../config/firebase";

export interface IMessage {
    avatar: string;
    createdAt: Timestamp;
    name: string;
    text: string; 
    uid: string;
    id: string;
}



const ChatRoom = () => {
    const [messages, setMessages] = useState<IMessage[] | null>(null);
    const scroll = useRef<HTMLSpanElement>(null);
    const messagesRef = collection(db, 'messages');
      
    useEffect(() => {
        const q = query(messagesRef, orderBy("createdAt"));
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedMessages: IMessage[] = Array.from(snapshot.docs).map((doc) => ({
                ...(doc.data() as IMessage),
                id: doc.id,
              }));
          setMessages(updatedMessages);
          // Scroll to the bottom when new messages arrive
          if (scroll.current) {
            // Check if the scroll is already at the bottom
            const isAtBottom = scroll.current.scrollHeight - scroll.current.scrollTop === scroll.current.clientHeight;

            // If it's already at the bottom or there are no messages, scroll to the bottom
            if (isAtBottom || !scroll.current.children.length) {
              scroll.current.scrollTop = scroll.current.scrollHeight;
            }          
          }
        });
    
        // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
        return () => unsubscribe();
      }, []); // Empty dependency array to run the effect once when the component mounts
    
    return (
        <main className="chat-box">
        <div className="messages-wrapper">
        {messages?.map((message) => <Message message={message} /> )}        
        </div>
        <span ref={scroll}></span>
        <SendMessage scroll={scroll}/>
        </main>
    );
};

export default ChatRoom;