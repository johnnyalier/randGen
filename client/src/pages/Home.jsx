import { useState, useEffect } from 'react'
import socket from '../sockets/socket.js';
import Lobby from '../components/Lobby'
import Game from '../components/Game'
import JoinGame from '../components/JoinGame'

const Home = () => {
    const [hasJoined, setHasJoined] = useState(false)
	const [socketId, setSocketId] = useState(null)
	const [gamestarted, setGameStarted] = useState(false)
	const [players, setPlayers] = useState([]);
	const [currentTurnId, setCurrentTurnId] = useState(null);
	const [player, setPlayer] = useState({});
	const [winner, setWinner] = useState(null);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected to server');
			setSocketId(socket.id);
		});

		socket.on('join_success', ({ player }) => {
			console.log(`${player.name} has successfully joined the game with ID: ${player.id}`);
			setPlayer(player);
			setHasJoined(true);
		});

		socket.on('player_joined', ({updatePlayers}) => {
			console.log(Object.values(updatePlayers));
			setPlayers(Object.values(updatePlayers));
		});
		socket.on('game_started', () => {
			console.log('Game has started');
			setGameStarted(true);
		});

		socket.on('turn_update', (currentTurnId) => {
			console.log(`Current turn ID: ${currentTurnId}`);
			// You can handle turn updates here if needed
			setCurrentTurnId(currentTurnId);
		});

		socket.on('join_error', (error) => {
			console.error('Error joining game:', error);
			alert(error);
		});

		socket.on('game_over', ({ winner }) => {
			console.log(`Game over! Winner is: ${winner.name}`);
			setWinner(winner);
			// Reset game state if needed
		});

		return () => {
			socket.off('connect');
			socket.off('join_success');
			socket.off('player_joined');
			socket.off('game_started');
			socket.off('turn_update');
			socket.off('join_error');
		};
	}, []);
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mb-4">Random Number Generator</h1>
				{!hasJoined && <JoinGame socketId={socketId}/>}
				{hasJoined && !gamestarted && <Lobby players={players} />}
				{hasJoined && gamestarted && 
					<Game socketId={socketId} currentTurnId={currentTurnId} player={player} winner={winner} />
				}
			</div>
        </div>
    )
}

export default Home