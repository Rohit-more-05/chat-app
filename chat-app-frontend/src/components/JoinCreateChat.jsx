import React from 'react';
import speak from '../assets/speak.png';
import { toast } from 'react-hot-toast';
import { createRoom as createRoomApi, joinChatApi } from '../services/RoomService';
import { HttpStatusCode } from 'axios';
import { useChatContext } from '../context/ChatContext.jsx';
import { useNavigate } from 'react-router-dom';

const JoinCreateChat = () => {
    const { roomId, userName, setRoomId, setCurrentUser, setConnected } = useChatContext();
    const navigate = useNavigate();

    const [detail, setDetail] = React.useState({
        roomId: "",
        userName: "",
    });


    function handleFormInputChange(e) {
        setDetail({ ...detail, [e.target.name]: e.target.value })
    }

    function validateForm() {
        if (detail.userName.trim() === "" || detail.roomId.trim() === "") {
            toast.error("Please fill in all fields");
            return false;
        }
        return true;
    }

    async function joinChat(e) {
        if (e?.preventDefault) e.preventDefault();
        if (validateForm()) {
            
            try {
            // join logic
            const room = await joinChatApi(detail.roomId);
            setCurrentUser(detail.userName);
            setRoomId(detail.roomId);
            setConnected(true);
            navigate('/chat');
            toast.success("Joined room successfully");
            } catch (error) {
                toast.error("Error joining room");
                console.error("Error joining room:", error);
            }
        }
    }

    async function createRoom(e) {
        if (e?.preventDefault) e.preventDefault();
        if (validateForm()) {
            // create logic
            console.log(detail);
            // call api to create room on backend
            try {
                // send the full object so server receives JSON with roomId and userName
                const data = await createRoomApi(detail);
                console.log("Room created successfully:", data);
                toast.success("Room created successfully");
                // forward the chatroom
                setCurrentUser(detail.userName);
                setRoomId(data.roomId);
                setConnected(true);
                navigate('/chat');
                // joinChat();
            } catch (error) {
                console.error("Error creating room:", error);
                if (error.response?.status === 409) {
                    toast.error("Room already exists");
                }
                else if (error.response?.status === 500) {
                    toast.error("Internal server error");
                }
                else {
                    toast.error("Error creating room");
                }
            }
        }
    }

    return (
        <form>
            <div className="min-h-screen flex items-center justify-center ">
                <div className="p-10 w-full flex flex-col gap-5 max-w-md rounded bg-gray-900 shadow">

                    <div><img src={speak} alt="Chat Icon" width="96" className="mx-auto align-middle" /></div>

                    <h1 className="text-2xl font-semibold text-center">
                        Join Room / Create Room...
                    </h1>
                    <div className="flex justify-center gap-2 mt-4">
                        <label htmlFor="name" className="block font-medium mb-2">Your Name</label>
                        <input
                            onChange={handleFormInputChange}
                            value={detail.userName}
                            type="text"
                            id="name"
                            name="userName"
                            placeholder='Enter the name'
                            className="w-full bg-gray-600 px-4 py-2 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center gap-2 mt-4 ">
                        <label htmlFor="name" className="block font-medium mb-2">New Room Id</label>
                        <input
                            onChange={handleFormInputChange}
                            value={detail.roomId}
                            type="text"
                            id="name"
                            name="roomId"
                            placeholder='Enter the room id'
                            className="w-full bg-gray-600 px-4 py-2 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        <button onClick={joinChat} className="px-3 py-2 bg-blue-600 hover:text-blue-500 rounded-full ">Join Room</button>
                        <button onClick={createRoom} className="px-3 py-2 bg-orange-600 hover:text-orange-500 rounded-full ">Create Room</button>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default JoinCreateChat;