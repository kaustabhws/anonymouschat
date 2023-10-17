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
          <div className="spinnerContainer">
            <div className="spinner"></div>
            <div className="loader">
              <p>loading</p>
              <div className="words">
                <span className="word">posts</span>
                <span className="word">images</span>
                <span className="word">followers</span>
                <span className="word">hashtags</span>
                <span className="word">posts</span>
              </div>
            </div>
          </div>
        ) : (
          chats.length === 0 ? (
            <div className="loaders">
              <div className="loader-inner">
                <div className="loader-block"></div>
                <div className="loader-block"></div>
                <div className="loader-block"></div>
                <div className="loader-block"></div>
                <div className="loader-block"></div>
                <div className="loader-block"></div>
                <div className="loader-block"></div>
                <div className="loader-block"></div>
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