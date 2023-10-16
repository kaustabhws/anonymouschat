import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './ChatDetails.css';
import ChatContext from '../context/chats/ChatContext';
import Header from '../Header/Header';

const ChatDetails = () => {
    const { chatId } = useParams();
    const [chatDetails, setChatDetails] = useState({});
    const context = useContext(ChatContext);
    const { addVote } = context; // You don't need `detailsChat` here
    // No need for props

    const dateOptions = {
        day: 'numeric',
        month: 'long',
    };
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const [hasVoted, setHasVoted] = useState(false);

    const updateVote = (e) => {
        if (!hasVoted) {
            addVote(chatId); // Use chatId from useParams to add a vote
            setHasVoted(true);
            localStorage.setItem(`voted_${chatId}`, 'true');
        }
        e.preventDefault();
    };

    useEffect(() => {
        // Check if the user has already voted in a previous session
        const hasVotedPreviously = localStorage.getItem(`voted_${chatId}`);
        if (hasVotedPreviously === 'true') {
            setHasVoted(true);
        }
    }, [chatId]);

    useEffect(() => {
        const fetchChatDetails = async () => {
            try {
                const response = await fetch(`https://anonymous-chat-backend-dbff383357d6.herokuapp.com/api/chats/details/${chatId}`);
                if (response.ok) {
                    const chatDetailsData = await response.json();
                    setChatDetails(chatDetailsData);
                } else {
                    console.error('Error fetching chat details');
                }
            } catch (error) {
                console.error('Error fetching chat details:', error);
            }
        };
        fetchChatDetails();
    }, [chatId]);

    const renderVoteIcon = () => {
        if (hasVoted) {
            return (
                <i className="fa-solid fa-hand fa-xl"></i>
            );
        } else {
            return (
                <i className="fa-regular fa-hand fa-xl" onClick={updateVote}></i>
            );
        }
    };

    const [copied, setCopied] = useState(false);

    const copy = async () => {
        if (navigator.share) {
            try {
              const currentURL = window.location.href; // Get the current URL
              await navigator.share({
                title: 'Shared from My App',
                text: 'Check out this content!',
                url: currentURL, // Use the current URL
              });
            } catch (error) {
              console.error('Share API error:', error);
            }
          } else {
            const shareURL = window.location.href;
            const input = document.createElement('input');
            input.value = shareURL;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
          }
    }

    return (
        <div className="details-wrapper">
            <Header />
            <div className="chat-container detailed">
                <div className="chats">
                    <div className="profile-details detail">
                        <div className="user-info">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                <path d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                            </svg>
                            <p className="profile-name">
                                Anonymous User
                            </p>
                        </div>
                        <i class="fa-solid fa-share-nodes fa-xl" style={{ color: '#ffffff' }} onClick={copy}></i>
                    </div>

                    <div className="chat-details">
                        <div className="chat-body details">
                            {chatDetails.body}
                        </div>
                        <div className="chat-vote">
                            {renderVoteIcon()}
                            <p>{chatDetails.vote}</p>
                        </div>
                        <div className="chat-date">
                            {chatDetails.date &&
                                new Date(chatDetails.date).toLocaleDateString('en-US', dateOptions)
                            }, {chatDetails.date &&
                                new Date(chatDetails.date).toLocaleTimeString('en-US', timeOptions)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatDetails;
