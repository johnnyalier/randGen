import React from 'react'
import socket from '../sockets/socket';
import { Button } from 'flowbite-react'

const JoinGame = ({ socketId }) => {
    const [name, setName] = React.useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }
    const handleJoin = () => {
        // Logic to handle joining the game
        console.log(`${name} with socket ID ${socketId} has joined the game`);
        socket.emit('join_game', { socketId, name });
        setName(''); // Clear the input after joining
    }

    return (
        <div className="text-center p-6">
            <input 
                className="border p-2 mb-4 rounded w-full max-w-xs"
                value={name}
                type="text" 
                placeholder='Enter your name' 
                onChange={handleChange} 
            />
            <Button onClick={handleJoin}>
                Join Game
            </Button>            
        </div>
    )
}

export default JoinGame