//import { useState, useEffect } from 'react'
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser,useUserUpdate } from "../context/UserContext"; 
import NavbarDashboard from './NavbarDashboard';
import './Chat.css';


const Chat = ({socket}) => {
    const context_user = useUser()
    const context_userUpdate = useUserUpdate()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    

    useEffect(() => {
        
        socket.on('chat message', function(msg) {
            setMessages(messages => [...messages, msg]);
        });
    }, [socket]);
 
    const history = useHistory();

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    }

    const send = (event) => {
        event.preventDefault(); 
        socket.emit('chat message', {userName: context_user.name, message});
        setMessage('');
    }

    return (
        <>
            <NavbarDashboard></NavbarDashboard>
            <br></br>
            <div className="d-flex justify-content-center">
            <div className="card w-75">
                {/*
            { socket ? (
                    <div className="chat-container">
                    <Messages socket={socket} />
                    
                    </div>
                ) : (
                    <div>Not Connected</div>
                )}
                */}
            <main className="container">
                <h1>Profile</h1>
                
                
                <ul id="messages">
                { messages.map((item,index) => (   
                    <li key={index}>{item.userName}: {item.message}</li>
                ))}
                </ul>
                
                <form id="form" onSubmit={send}>
                    <input type="text" autoComplete="off" name="input" id="input"  onChange={handleInputChange} className="form-control" value={message}></input>
                    <button>Send</button>
                </form>
            </main>

            </div>
            </div>
        </>
    )
}

export default Chat;
