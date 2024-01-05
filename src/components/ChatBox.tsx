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



const ChatBox = () => {
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
            scroll.current.scrollIntoView({ behavior: "smooth" });
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

export default ChatBox;