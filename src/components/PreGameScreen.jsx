
const PreGameScreen = ({setGameStart, startGame, setPathScreen}) => {
    const leaveTitleScreen = () => {
        startGame()
        setPathScreen(true)
        setGameStart(true)
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center text-red-100">

      <div className="flex flex-col">
        <h1 className="text-[5rem]">Root</h1>
        <button className="text-[3rem] hover:text-green-600" onClick={() => leaveTitleScreen()}>Start Game</button>
      </div>

    </div>
  )
}

export default PreGameScreen