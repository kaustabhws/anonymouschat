import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import ChatState from './components/context/chats/ChatState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddChat from './components/Chats/AddChat';
import ChatDetails from './components/Chats/ChatDetails';
import Login from './components/Users/Login';
import Signup from './components/Users/Signup';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <ChatState>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/addpost' element={<AddChat />} />
            <Route path="/details/:chatId" element={<ChatDetails />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ChatState>
  );
}

export default App;
