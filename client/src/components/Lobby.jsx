import React from 'react'

const Lobby = ({players}) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Waiting for more players to join...</h2>
            <div className='flex flex-col items-center'>
                {players.map(player => (
                    <div key={player.id} className="mb-2">
                        <span className="font-semibold">{player.name}</span> (ID: {player.id})
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Lobby