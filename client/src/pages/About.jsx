import React from 'react'

const About = () => {
    const rules = [
        "Wait till it's your turn",
        "You play only once per turn",
        "scores are cummulative of each round's score",
        "Winner is displayed at 5 rounds of play"
    ]
    return (
        <div className='flex flex-col items-center justify-center gap-5 mt-5'>
            <h1 className='text-5xl font-bold '>About RandGen Game</h1>
            <p className='p-5 w-full text-lg'>This game is very simple to play. All you have to do is click a button to generate a random number in each round. At the end of 5 rounds, your random numbers are summed and the player with the highest sum wins the game. So good luck.</p>
            <h2 className='text-3xl font-bold text-gray-500 my-5'>
                How to play the game
            </h2>
            <ul className='flex flex-col gap-5 list-decimal list-inside text-lg text-gray-500'>
                {rules.map((item, index) => (
                    <li className='mb-1' key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default About