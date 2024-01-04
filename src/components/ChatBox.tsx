import React, { useEffect, useRef, useState } from "react";
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
}



const ChatBox = () => {
    const [messages, setMessages] = useState<IMessage[] | null>(null);
    const scroll = useRef();

    const messagesRef = collection(db, 'messages');
      
    useEffect(() => {
        const getMessages = async () =>{
            const data = await getDocs(messagesRef);
            setMessages(data.docs.map((doc) => ({...doc.data()})) as IMessage[]);
        };

        getMessages();

    }, []);
    
    return (
        <main className="chat-box">
        <div className="messages-wrapper">
        {messages?.map((message) => <Message message={message} /> )}        
        </div>
        <SendMessage />
        </main>
    );
};

export default ChatBox;