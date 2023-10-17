import React, { useContext, useState } from 'react'
import './AddChat.css'
import Header from '../Header/Header'
import ChatContext from '../context/chats/ChatContext'
import { useNavigate } from 'react-router-dom'

const AddChat = () => {

    const context = useContext(ChatContext);
    const { addChat, detailsChat } = context;

    const [chat, setChat] = useState({body: ""})

    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        addChat(chat.body)
        .then((newChat) => {
            history(`/details/${newChat._id}`);
        })
        .catch((error) => {
            console.error("Failed to add chat:", error);
        });
        setChat({body: ""});
    }

    const onChange = (e) => {
        setChat({
            ...chat,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="post-container">
            <Header />
            <div className="post-wrap">
                <div className="post-wrapper">
                    <div className="post-header">
                        <h2>Add a post</h2>
                    </div>
                    <div className="post-input">
                        <textarea name="body" id="" cols="30" rows="10" placeholder='Enter your text here' onChange={onChange}></textarea>
                    </div>
                    <div className="post-btn">
                        <button className="button" onClick={handleSubmit}>Post →</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddChat;
