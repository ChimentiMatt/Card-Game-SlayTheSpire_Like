import { useState, useEffect } from "react"
const PostBattleScreen = ({nextEncounter, drawableCards, cardsInHand, setCardsInHand, uuid, setUuid }) => {
  const [choiceOne, setChoiceOne] = useState({})
  const [choiceTwo, setChoiceTwo] = useState({})
  const [choiceThree, setChoiceThree] = useState({})
  
  useEffect(()=> {
    let copyUuid = uuid
 
    const copyOfDrawableCards = []

    // Non state influenced copy of array being made
    for (let i = 0; i < drawableCards.length; i++){
      copyUuid++
      drawableCards[i].id = copyUuid
      copyOfDrawableCards.push(drawableCards[i])
    }
    setUuid(uuid + 3)

    let randomIndex =  Math.floor(Math.random() * (copyOfDrawableCards.length - 0) ) + 0
   
    setChoiceOne(copyOfDrawableCards[randomIndex])


    copyOfDrawableCards.splice(randomIndex, 1)
    randomIndex = Math.floor(Math.random() * (copyOfDrawableCards.length - 0) ) + 0


    setChoiceTwo(copyOfDrawableCards[randomIndex])
    copyOfDrawableCards.splice(randomIndex, 1)
    randomIndex = Math.floor(Math.random() * (copyOfDrawableCards.length - 0) ) + 0


    setChoiceThree(copyOfDrawableCards[randomIndex])
 
  }, [])

  const addCardToHand = (card) =>{
    if (card === '1') {
      setCardsInHand([...cardsInHand, choiceOne])
      nextEncounter()
    }
    else if (card === '2') {
      setCardsInHand([...cardsInHand, choiceTwo])
      nextEncounter()
    }
    else if (card === '3') {
      setCardsInHand([...cardsInHand, choiceThree])
      nextEncounter()
    }
  }


  return (
    <div className="absolute flex flex-col items-center top-0 z-20 h-[70vh] w-[70vw] mt-[20vh] ml-[15vw] bg-red-500">
      <h1>Choose your card</h1>
      <div className="flex gap-[1rem] ">

        <div className="cards" onClick={() => addCardToHand('1')}>
          <p>{choiceOne.str}</p>
          <p>{choiceOne.energy}</p>
          <p>{choiceOne.shield}</p>
        </div>

        <div className="cards" onClick={() => addCardToHand('2')}>

          <p>{choiceTwo.str}</p>
          <p>{choiceTwo.energy}</p>
          <p>{choiceTwo.shield}</p>
        </div>

        <div className="cards" onClick={() => addCardToHand('3')}>
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