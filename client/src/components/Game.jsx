import { useState } from "react"
import socket from '../sockets/socket.js';

const Game = ({socketId, currentTurnId, player, winner }) => {
    const [score, setScore] = useState(null);
    const [totalScore, setTotalScore] = useState(0);
    const [currentRound, setCurrentRound] = useState(null);
    
    const isMyTurn = currentTurnId === player.id;
    const submitScore = () => {
        if (!isMyTurn) {
            console.log("It's not your turn to play");
            return;
        }
        // Emit the score to the server
        socket.emit('submit_score', {socketId}, (response) => {
            if (response.success) {
                console.log("Score submitted successfully");
                setScore(response.score); // Clear the score after submitting
                setTotalScore(totalScore + response.score);
                setCurrentRound(response.round);
            } else {
                console.error("Failed to submit score:", response.error);
            }
        });
        // Reset the score input
        setScore(null); // Clear the score after submitting
    }
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h2 className="text-xl font-bold mb-4">Your Name: {player.name}</h2>
            <h2 className="text-l font-bold mb-4">Total score: {totalScore}</h2>
            <h2 className="text-md font-bold mb-4">Round {currentRound} score: {score}</h2>
            <h5 className="text-sm mb-4">Current Player: {currentTurnId}</h5>
            { winner ?
                <h3 className="text-xl font-bold mb-4 text-green-500">
                    Game Over! Winner: {winner.name} with scores {JSON.stringify(winner.scores)}
                </h3>
                :
                <h3 className="text-xl font-bold mb-4">
                    {isMyTurn ? 'Your Turn' : 'Waiting for your turn...'}
                </h3>
            }
            <button 
                disabled={!isMyTurn}
                onClick={submitScore}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
                Play
            </button>
        </div>
    )
}

export default Game