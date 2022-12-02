import { useState, useEffect } from "react"
const PostBattleScreen = ({nextEncounter, drawableCards}) => {
  const [choiceOne, setChoiceOne] = useState({})
  const [choiceTwo, setChoiceTwo] = useState({})
  const [choiceThree, setChoiceThree] = useState({})
  useEffect(()=> {
 
    const copyOfDrawableCards = []

    // Non state influenced copy of array being made
    for (let i = 0; i < drawableCards.length; i++){
      copyOfDrawableCards.push(drawableCards[i])
    }


    let randomIndex =  Math.floor(Math.random() * (copyOfDrawableCards.length - 0) ) + 0

    setChoiceOne(copyOfDrawableCards[randomIndex])
    console.log(copyOfDrawableCards)

    copyOfDrawableCards.splice(randomIndex, 1)
    randomIndex = Math.floor(Math.random() * (copyOfDrawableCards.length - 0) ) + 0
    console.log(copyOfDrawableCards)

    setChoiceTwo(copyOfDrawableCards[randomIndex])
    copyOfDrawableCards.splice(randomIndex, 1)
    randomIndex = Math.floor(Math.random() * (copyOfDrawableCards.length - 0) ) + 0
    console.log(copyOfDrawableCards)

    setChoiceThree(copyOfDrawableCards[randomIndex])
    console.log(copyOfDrawableCards)
  }, [])


  return (
    <div className="absolute flex flex-col items-center top-0 z-20 h-[70vh] w-[70vw] mt-[20vh] ml-[15vw] bg-red-500">
      <h1>Choose your card</h1>
      <div className="flex gap-[1rem] ">

        <div className="cards">
          <p>{choiceOne.str}</p>
          <p>{choiceOne.energy}</p>
          <p>{choiceOne.shield}</p>
        </div>

        <div className="cards">

          <p>{choiceTwo.str}</p>
          <p>{choiceTwo.energy}</p>
          <p>{choiceTwo.shield}</p>
        </div>

        <div className="cards">
          <p>{choiceThree.str}</p>
          <p>{choiceThree.energy}</p>
          <p>{choiceThree.shield}</p>
        </div>
      </div>
        <button onClick={() => nextEncounter()}>Exit for now</button>
    </div>
  )
}

export default PostBattleScreen