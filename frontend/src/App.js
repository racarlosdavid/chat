import React, { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Home from './Home/Home';
import config from './config/config';
import { UserProvider } from './context/UserContext';
import Chat from './Chat/Chat';
const { io } = require("socket.io-client");

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`${config.BACKEND}`);
    newSocket.emit('add user', {user:"nombre"});
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <>
    <UserProvider>
        <Switch>
          {/* OUT */}
          <Route exact path="/" component={Home} />
          {/* IN */}
          <Route exact path="/chat" render={() => (<Chat socket={socket} />)} />
        </Switch>
        <ToastContainer autoClose={1500} hideProgressBar />
    </UserProvider>
    </>
  );
}

export default App;
