
const PostBattleScreen = ({setPostBattle}) => {
  return (
    <div className="relative z-20 h-[50vh] w-[50vw] mt-[25vh] ml-[25vw] bg-red-500">
        <h1>Choose your card</h1>
        <button onClick={() => setPostBattle(false)}>Exit for now</button>
    </div>
  )
}

export default PostBattleScreen