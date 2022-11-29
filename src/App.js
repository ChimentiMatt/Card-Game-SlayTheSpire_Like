import { useState, useEffect } from 'react'
import gsap from 'gsap'
import PreGameScreen from './components/PreGameScreen'
import Hand from './components/Hand'
import Creature from './components/Creature'
import DeckScreen from './components/DeckScreen'
import './styles.css'
import DrawPileScreen from './components/DrawPileScreen'

let notStateDiscardPile = []
let notStateDrawPile = []
let notStateHand = []
let notStateDeck = [
    { id: 1, str: 1, def: 2},
    { id: 2, str: 2, def: 3},
    { id: 3, str: 3, def: 3},
    { id: 4, str: 3, def: 3},
    { id: 5, str: 1, def: 2},
    { id: 6, str: 2, def: 3},
    { id: 7, str: 3, def: 3},
    { id: 8, str: 3, def: 3},
]

function App() {
  const [gameStart, setGameStart] = useState(false)
  const [showDeck, setShowDeck] = useState(false)
  const [showDrawPile, setShowDrawPile] = useState(false)
  

  const [dummyState, setDummyState] = useState(0) 
  
  // const [uuid, setUuid] = useState(10)
  const [health, setHealth] = useState(20)
  const [energy, setEnergy] = useState(2)


  const [discardPile, setDiscardPile] = useState([])
  const [drawPile, setDrawPile] = useState([])
  const [cardsInHand, setCardsInHand] = useState([
    // { id: 1, str: 1, def: 2},
    // { id: 2, str: 2, def: 3},
    // { id: 3, str: 3, def: 3},
  ])
  const [deck, setDeck] = useState([
    { id: 1, str: 1, def: 2},
    { id: 2, str: 2, def: 3},
    { id: 3, str: 3, def: 3},
    { id: 4, str: 3, def: 3},
    { id: 5, str: 1, def: 2},
    { id: 6, str: 2, def: 3},
    { id: 7, str: 3, def: 3},
    { id: 8, str: 3, def: 3},
  ])


  const [creatureObj, setCreatureObj] = useState({hp: 20})

  useEffect(() => {
    // startGame()
  }, [])

  const draw = () => {
    if (notStateDrawPile.length === 0){
      // alert('shuffle')

      // Since there are no more cards to draw loop over deck
      // and add card to draw pile checking to see if its already in play.
      for (let i = 0; i < notStateDeck.length; i++){
        if (notStateHand.includes(notStateDeck[i])){
          // console.log(notStateHand)
          // console.log(notStateDeck[i])
        }
        else{
          notStateDrawPile.push(notStateDeck[i])
        }
      }
    
      setDrawPile(notStateDrawPile)
      notStateDiscardPile = []
      setDiscardPile([])
    }
    // console.log('deck', deck)
    // console.log('Not state draw pile', notStateDrawPile)

    // setCards(current => [...current,{ str: 4, def: 3},])
    if (notStateHand.length < 6){
      let index = Math.floor(Math.random() * (notStateDrawPile.length - 0) + 0)
      let cardToBeDrawn = notStateDrawPile[index]
      notStateDrawPile.splice(index, 1)
      // console.log(cardToBeDrawn)




      // setCardsInHand(current => [...current, createCard(),])
      notStateHand.push(cardToBeDrawn)
      // console.log(notStateHand)

    }

    setDummyState(dummyState +1)
    setCardsInHand(notStateHand)

  }

  const playCard = (damage, card, index) => {


    const calcDamage = creatureObj.hp - damage
    setCreatureObj(current => {
      return {...current, hp: calcDamage}
    })

    // Remove Card from hand
    // setCardsInHand(current => 
    //   current.filter(element => {
    //     return element.id !== card.id
    // }))
    // console.log(notStateHand)
    notStateHand.splice(index, 1)

    // Add the card object to Discard Pile array
    // setDiscardPile([...discardPile,{id:card.id, str: card.str}])
    notStateDiscardPile.push({id: card.id, str: card.str})

    setCardsInHand(notStateHand)
    setDiscardPile(notStateDiscardPile)

  }


  const startGame = () => {
    for (let i = 0; i < notStateDeck.length; i++){
      notStateDrawPile.push(notStateDeck[i])
    }


    for (let i = 0; i < 2; i++){
      let cardIndex = Math.floor(Math.random() * (notStateDrawPile.length - 0) + 0)

      // add card to hand
      notStateHand.push(notStateDeck[cardIndex])
      // setCardsInHand(current => [...current, deck[cardIndex]])

      // remove card from draw pile
      notStateDrawPile.splice(cardIndex, 1)
      // setDrawPile(current => 
      //   current.filter(element => {
      //     return element !== drawPile[cardIndex]
      // }))
    }
    setCardsInHand(notStateHand)
    setDrawPile(notStateDrawPile)
    setDeck(notStateDeck)
  }





  const testFunc = () => {
    // console.log('discard pile object', discardPile)
    // console.log(notStateDrawPile[0])
    // console.log(drawPile)
    console.log(discardPile)
   
  }


  return (
    <div className="App">
      {!gameStart && <PreGameScreen setGameStart={setGameStart} startGame={startGame}/>}
      {gameStart && <div>
        <div></div>
        
        
        {/* <button onClick={testFunc}>TEST</button> */}
        <button onClick={() => setShowDeck(!showDeck)}>Show Deck</button>

        <DrawPileScreen drawPile={drawPile} showDrawPile={showDrawPile} setShowDrawPile={setShowDrawPile} />

        {showDeck && <DeckScreen deck={deck}/>}
        
        <div id='discard-pile'>{discardPile.length}</div>

        <Creature creatureObj={creatureObj} setCreatureObj={setCreatureObj}/>


        <div id="card-container">
          {cardsInHand.map((card, index) => (
            <Hand key={index} card={card} cardsInHand={cardsInHand} index={index} playCard={playCard} />
            ))
          }
        </div> 

        <div id='health-and-energy-container'>
          <div id='health'>{health}</div>
          <div id='energy'>{energy}</div>
          
        </div>
        <div className='absolute bottom-[4rem] right-[10rem]'>
          <button className='text-[3rem] border-2 rounded p-2 bg-white' onClick={draw}>End Turn</button>
        </div>
      </div>}
    

    </div>
  );
}

export default App;
