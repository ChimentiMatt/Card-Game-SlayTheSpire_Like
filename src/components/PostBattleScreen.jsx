
const PostBattleScreen = ({nextEncounter}) => {
  return (
    <div className="absolute top-0 z-20 h-[70vh] w-[70vw] mt-[20vh] ml-[15vw] bg-red-500">
        <h1>Choose your card</h1>
        <button onClick={() => nextEncounter()}>Exit for now</button>
    </div>
  )
}

export default PostBattleScreen