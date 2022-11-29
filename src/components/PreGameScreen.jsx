
const PreGameScreen = ({setGameStart, startGame}) => {
    const leaveTitleScreen = () => {
        startGame()
        setGameStart(true)
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center border-2 text-red-100">

      <div className="flex flex-col">
        <h1 className="text-[5rem]">Root</h1>
        <button className="text-[3rem]" onClick={() => leaveTitleScreen()}>Start Game</button>
      </div>


      
    </div>
  )
}

export default PreGameScreen