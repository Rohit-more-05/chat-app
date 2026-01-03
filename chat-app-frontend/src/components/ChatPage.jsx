import React, { useEffect, useState } from "react";
import { MdSend, MdAttachFile } from "react-icons/md";
import { useChatContext } from '../context/ChatContext.jsx';
import { useNavigate } from 'react-router-dom';
import { baseURL } from "../config/AxiosHelper.js";
import { toast } from "react-hot-toast";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getMessages } from "../services/RoomService.js";
import { timeAgo } from '../config/Helper.js';

const ChatPage = () => {

    const demoUser = "Alice";

    const [input, setInput] = useState("");
    const inputRef = React.useRef(null);
    const chatBoxRef = React.useRef(null);
    const [stompClient, setStompClient] = useState(null); // stomp client instance
    const [counter, setCounter] = useState(true); // just a counter to trigger useEffect

    const { roomId, currentUser, connected, setRoomId, setCurrentUser, setConnected } = useChatContext();

    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // if not connected, redirect to join page
        if (!connected) {
            navigate('/');
        }
    }, [connected, navigate]);

    useEffect(() => (
        async function loadMessages() {
            // load previous messages from server
            try {
                const messages = await getMessages(roomId);
                console.log(messages);
                setMessages(messages);
            } catch (error) {
                console.error("Error loading messages:", error);
            }
        }

    ), [])

    //scrolll to bottom on new message
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scroll({
                top: chatBoxRef.current.scrollHeight,
                behaviour: 'smooth',

            })
        }
    }, [messages])

    //page init : 
    // messages la load karava lagel 
    // stomp client la initialize karava lagel
    // subscribe 
    useEffect(() => {
        if (!roomId) return; // nothing to subscribe to yet

        let client;
        const connectWebSocket = () => {
            // socketjs client init and connect
            const sock = new SockJS(`${baseURL}/chat`);
            client = Stomp.over(sock);

            client.connect({}, () => {
                setStompClient(client);

                toast.success("Connected to chat server");

                //subscribe to the room
                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    const newMessage = JSON.parse(message.body);

                    setMessages((prev) => [...prev, newMessage]);
                });
            }, (err) => {
                console.error('STOMP connect error:', err);
                toast.error('Failed to connect to chat server');
            });
        };

        connectWebSocket();

        return () => {
            try {
                client && client.disconnect && client.disconnect();
            } catch (err) {
                // swallow disconnect errors
            }
        };
    }, [roomId]);

    const sendMessage = () => {
        if (stompClient && connected && input.trim() !== "") {
            console.log("Sending message:", input);

            const message = {
                content: input,
                sender: currentUser ? currentUser : demoUser,
                roomId: roomId,
                timestamp: new Date().toISOString()
            };
            stompClient.send(`/app/sendMessage/${roomId}`,
                {},
                JSON.stringify(message));
            setInput("");
        }
    }

    //send message handle

    // roomId set karava lagel
    // currentUser set karava lagel

    const handleLogout = () => {
        stompClient.disconnect();
        setConnected(false);
        setRoomId(null);
        setCurrentUser(null);
        navigate('/');
    }

    return (
        // this is header portion
        // <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white">
        <div className="">
            <header className="border fixed flex flex-row gap-5 p-5 items-center justify-between w-full bg-gray-800">
                {/* room name container */}
                <div>
                    <h1 className="text-xl semi-bold">Room: <span>{roomId}</span></h1>
                </div>
                {/* username container */}
                <div>
                    <h1 className="text-xl semi-bold">User: <span>{currentUser ? currentUser : demoUser}</span></h1>
                </div>
                {/* BUTTON: LEAVE ROOM */}
                <div>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Leave Room
                    </button>
                </div>

            </header>

            <main className="pt-20 border w-2/3 bg-slate-600 mx-auto h-screen overflow-auto">

                {messages.map(
                    (message, index) => {
                        const isLastInGroup = messages[index + 1]?.sender !== message.sender;
                        // Sender (current user) will be shown on the LEFT; others on the RIGHT
                        // const isSender = message.sender === (currentUser); main change to avoid 
                        const isSender = message.sender === currentUser || message.sender === demoUser;

                        return (
                            <div key={index}> { /* message wrapper */}
                                <div className={`flex ${isSender ? "justify-start" : "justify-end"} ${isLastInGroup ? "mb-10" : "mb-1"}`}>
                                    <div className={`my-2 flex ${isSender ? "bg-green-700 ml-5 mr-auto" : "bg-gray-700 mr-5 ml-auto"} p-2 rounded max-w-xs`}>
                                        <div className={`flex gap-2 items-end ${isSender ? "flex-row" : "flex-row-reverse"}`}>
                                            <img className="h-10 w-10 rounded-full" src="https://avatar.iran.liara.run/public/35" alt="" />
                                            <div className="border flex flex-col gap-1">
                                                <p className="text-sm font-bold">{message.sender}
                                                    <span className="ml-2 text-xs font-normal text-gray-300">{timeAgo(message.timestamp)}</span>
                                                </p>
                                                <p className={`${isSender ? "text-left" : "text-right"}`}>{message.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}

            </main>

            {/* input message container */}
            <div className="fixed bottom-2 w-full h-16 ">
                <div className="fixed bottom-2 w-full h-16 px-4">
                    <div className="h-full max-w-4xl mx-auto flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg p-2">

                        <input
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}

                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Attach Button */}
                        <button className="bg-gray-600 hover:bg-gray-500 text-white 
                               p-2 rounded-full transition-colors">
                            <MdAttachFile size={20} />
                        </button>

                        {/* Send Button */}
                        <button
                            onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 text-white 
                               p-2 rounded-full transition-colors">
                            <MdSend size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;