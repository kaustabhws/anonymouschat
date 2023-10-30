import React, { useContext, useState, useEffect } from 'react';
import './Chat.css';
import ChatContext from '../context/chats/ChatContext';
import { useNavigate } from 'react-router-dom'

const Chat = (props) => {

    const context = useContext(ChatContext);
    const { addVote, detailsChat } = context;
    const { chat } = props;

    const history = useNavigate()

    const date = new Date(chat.date);
    const dateOptions = {
        day: 'numeric',
        month: 'long',
    };
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const chatDetails = (e) => {
        history(`/details/${chat._id}`);
    }


    const [hasVoted, setHasVoted] = useState(false);

    const updateVote = (e) => {
        if (!hasVoted) {
            addVote(chat._id);
            setHasVoted(true);
            localStorage.setItem(`voted_${chat._id}`, 'true');
        }
        e.preventDefault();
    };

    useEffect(() => {
        const hasVotedPreviously = localStorage.getItem(`voted_${chat._id}`);
        if (hasVotedPreviously === 'true') {
            setHasVoted(true);
        }
    }, [chat._id]);

    const renderVoteIcon = () => {
        if (hasVoted) {
            return (
                <i className="fa-solid fa-hand fa-xl"></i>
            );
        } else {
            return (
                <i className="fa-regular fa-hand fa-xl"></i>
            );
        }
    };

    return (
        <div className="chats">
            <div className="profile-details">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                    <path d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                </svg>
                <p className="profile-name">
                    Anonymous User
                </p>
            </div>

            <div className="chat-details">
                <div className="chat-body">
                    {chat.body}
                    <p onClick={chatDetails}>details...</p>
                </div>
                <div className="chat-vote">
                    <div className="vote-con" onClick={updateVote}>
                        {renderVoteIcon()}
                    </div>
                    <p className='vote-no'>{chat.vote}</p>
                </div>
                <div className="chat-date">
                    {date.toLocaleDateString('en-US', dateOptions)}, {date.toLocaleTimeString('en-US', timeOptions)}
                </div>
            </div>
        </div>
    );
};

export default Chat;
