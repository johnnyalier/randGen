import Player from '../models/player.js';
import randomgenerator from '../utils/randomGenerator.js';

const players = {};
let currentRound = 1;
const MAX_ROUNDS = 5;
let currentTurnId = 1

function registerGameSocket(io, socket) {

    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        delete players[socket.id];
        io.emit('player_list', Object.keys(players));
    });

    io.emit('player_list', Object.keys(players));

    socket.on('join_game', ({ socketId, name }) => {
        if (!name || !socketId) {
            console.error('Invalid player data');
            socket.emit('join_error', 'Invalid player data');
            return;
        }
        if (players[socketId]) {
            console.error(`Player with ID ${socketId} already exists`);
            socket.emit('join_error', 'You have already joined the game');
            return;
        }
        if (Object.keys(players).length >= 4) {
            console.error('Game is full');
            socket.emit('join_error', 'Game is full');
            return;
        }
        const playerId = Object.keys(players).length + 1;
        const player = new Player(name, playerId);
        console.log(`${name} has joined the game with ID: ${playerId}`);
        players[socketId] = player;
        console.log(players);

        socket.emit('join_success', { player });

        if (Object.keys(players).length === 4) {
            console.log('All players have joined, starting the game');
            io.emit('game_started');
            io.emit('turn_update', currentTurnId)
            return
        }
        
        io.emit('player_joined', { updatePlayers:  players});
    });

    socket.on('submit_score', ({socketId}, callback) => {
        if (!players[socketId] || !players[socketId].roundSubmitted) {
            socket.emit('submit_error', 'Unidentified player or score already submitted');
        }
        const number = randomgenerator();

        players[socketId].scores.push(number);
        players[socketId].roundSubmitted = true;

        currentTurnId++;
        if (currentTurnId > Object.keys(players).length) {
            currentTurnId = 1; // Reset to the first player
        }

        callback({
            success: true,
            score: number,
            round: currentRound
        });

        // Check if all players have submitted for the round
        const allSubmitted = Object.values(players).every(p => p.roundSubmitted);

        if (allSubmitted) {
            currentRound++;

            io.emit('round_complete', {
                round: currentRound - 1
            });

            if (currentRound > MAX_ROUNDS) {
                // Game over
                let winner = null;
                let highestScore = -Infinity;
                Object.values(players).forEach(player => {
                    const totalScore = player.scores.reduce((sum, score) => sum + score, 0);

                    if (totalScore > highestScore) {
                        highestScore = totalScore;
                        winner = player;
                    }

                });

                io.emit('game_over', { winner });

                currentRound = 1;
                Object.values(players).forEach(p => {
                    p.scores = [];
                    p.roundSubmitted = false;
                });
                return;
            }

            // Reset for next round
            Object.values(players).forEach(p => p.roundSubmitted = false);
            io.emit('next_round', currentRound);
        }
        io.emit('turn_update', currentTurnId)
    });
}

export default registerGameSocket;
