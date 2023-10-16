import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Header from '../Header/Header'
import ChatContext from '../context/chats/ChatContext'
import Chat from '../Chats/Chat'


const Home = () => {

  const context = useContext(ChatContext)

  const { chats, allChats } = context

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    allChats().then(() => {
      setLoading(false);
    });
  }, []);


  return (
    <div className='home'>
      <Header />
      <div className="chat-container">
        {loading ? (
          <div class="spinnerContainer">
            <div class="spinner"></div>
            <div class="loader">
              <p>loading</p>
              <div class="words">
                <span class="word">posts</span>
                <span class="word">images</span>
                <span class="word">followers</span>
                <span class="word">hashtags</span>
                <span class="word">posts</span>
              </div>
            </div>
          </div>
        ) : (
          chats.length === 0 ? (
            <div class="loaders">
              <div class="loader-inner">
                <div class="loader-block"></div>
                <div class="loader-block"></div>
                <div class="loader-block"></div>
                <div class="loader-block"></div>
                <div class="loader-block"></div>
                <div class="loader-block"></div>
                <div class="loader-block"></div>
                <div class="loader-block"></div>
              </div>
              <p>No Posts Available</p>
            </div>

          ) : (
            chats.slice().reverse().map((chat) => (
              <Chat key={chat._id} chat={chat} />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Home