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
}



const ChatBox = () => {
    const [messages, setMessages] = useState<IMessage[] | null>(null);
    const scroll = useRef<HTMLSpanElement>(null);
    const messagesRef = collection(db, 'messages');
      
    useEffect(() => {
        const getMessages = async () =>{
            const data = await getDocs(messagesRef);
            const fetchedMessages: IMessage[] = data.docs.map((doc) => ({...doc.data()})) as IMessage[];
            const sortedMessages = fetchedMessages.sort(
                (a, b) => {
                    if (a > b) {
                    return 1;
                }
                    if (a < b) {
                    return -1;
                }
            
                return 0;
            }).reverse();
            setMessages(sortedMessages);

        };

        getMessages();

    }, [messages]);
    
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