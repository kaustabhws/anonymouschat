import React, { useState } from 'react';
import ChatContext from './ChatContext';

const ChatState = (props) => {
    const host = "https://anonymous-chat-backend-dbff383357d6.herokuapp.com";

    const chatInitial = [];
    const [chats, setChats] = useState(chatInitial);

    // Fetch all chats
    const allChats = async () => {
        const url = `${host}/api/chats/fetchallchats`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        setChats(json);
    };

    // Add a chat
    const addChat = async (body) => {
        const url = `${host}/api/chats/addchat`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body }),
        });
        const json = await response.json();
        setChats([...chats, json]);

        return json;
    };

    // Update votes
    const addVote = async (id) => {
        const url = `${host}/api/chats/vote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        });
        await response.json();
        const updatedChats = chats.map(chat => {
            if (chat._id === id) {
                return { ...chat, vote: chat.vote + 1 };
            }
            return chat;
        });
        setChats(updatedChats);
    };

    // Fetch details of a chat
    const detailsChat = async (id) => {
        const url = `${host}/api/chats/details/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await response.json();
        // Update the state with the fetched chat details
        setChats([json]);
    };

    return (
        <ChatContext.Provider value={{ chats, allChats, addChat, addVote, detailsChat }}>
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatState;
