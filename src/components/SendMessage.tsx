import React, { FormEvent, useState } from "react";
import { auth, db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
    const [message, setMessage] = useState("");

    const sendMessage = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }
        const user = auth.currentUser;
        await addDoc(collection(db, "messages"), {
          text: message,
          name: user?.displayName,
          avatar: user?.photoURL,
          createdAt: serverTimestamp(),
          uid: user?.uid,
        });
        setMessage("");
      };
      
    return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;