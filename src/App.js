import { useState, useEffect } from 'react'
import gsap from 'gsap'
import './styles.css'
import PreGameScreen from './components/PreGameScreen'
import Header from './components/Header'
import Hand from './components/Hand'
import Creature from './components/Creature'
import DeckScreen from './components/DeckScreen'
import DrawPileScreen from './components/DrawPileScreen'
import PostBattleScreen from './components/PostBattleScreen'

let notStateDiscardPile = []
let notStateDrawPile = []
let notStateHand = []
let notStateDeck = [
  { id: 1, str: 3, shield: 0, energy: 3},
  { id: 2, str: 1, shield: 0, energy: 0},
  { id: 3, str: 1, shield: 1, energy: 2},
  { id: 4, str: 1, shield: 0, energy: 1},
  { id: 5, str: 2, shield: 2, energy: 2},
  { id: 6, str: 2, shield: 0, energy: 2},
  { id: 7, str: 3, shield: 3, energy: 5},
  { id: 8, str: 3, shield: 1, energy: 3},
]


function App() {
  const [gameStart, setGameStart] = useState(false)
  const [postBattle, setPostBattle] = useState(false)
  const [showDeck, setShowDeck] = useState(false)
  const [showDrawPile, setShowDrawPile] = useState(false)
  
  const [drawableCards, setDrawableCards] = useState([{id: null, str: 5, energy: 1}, {id: null, str: 7, energy: 2}, {id: null, str: 1, energy: 0}])
  // const drawableCards = [{id: null, str: 5, shield: 0, energy: 1}, {id: null, str: 7, shield: 0, energy: 2}, {id: null, str: 1, shield: 0, energy: 0}]

  const [dummyState, setDummyState] = useState(0) 

  const [playerObject, setPlayerObject] = useState({health: 20, energy: 30, shield: 0, gold: 0})
  
  // const [uuid, setUuid] = useState(10)
  const [health, setHealth] = useState(20)
  const [energy, setEnergy] = useState(3)
  const [shield, setShield] = useState(0)


  const [discardPile, setDiscardPile] = useState([])
  const [drawPile, setDrawPile] = useState([])
  const [cardsInHand, setCardsInHand] = useState([
    // { id: 1, str: 1, def: 2},
    // { id: 2, str: 2, def: 3},
    // { id: 3, str: 3, def: 3},
  ])
  const [deck, setDeck] = useState([])


  const [creatureObj, setCreatureObj] = useState({health: 5, dmg: 3})

  useEffect(() => {
    // startGame()
  }, [])



  const endTurn = () => {
    // take damage
    setPlayerObject(current => {
      return {...current, health: health + shield - creatureObj.dmg}
    })
    

    // regain energy (has a max of 5)
    if (energy + 2 < 5){
      setEnergy(energy + 2)
    }
    else{
      setEnergy(5)
    }
      

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

  const playCard = (card, index) => {
    // if not enough energy
    if (card.energy > energy){
      // alert('need more energy')
    }
    // if energy check passed
    else{
      setEnergy(energy - card.energy)

      setShield(card.shield)

      
      let heroTL = gsap.timeline({repeat: 0});
      heroTL.to('#hero', {rotate: '50deg', x: '2rem'})
      heroTL.to('#hero', {rotate: '0deg', x :'0'})
      
      let creatureTL = gsap.timeline({repeat: 0});
      creatureTL.to('#creature', {delay: .4, duration: .1, x: '1rem'})
      creatureTL.to('#creature', { duration: .1, x: '-1rem'})
      creatureTL.to('#creature', { duration: .1, x: '1rem'})
      creatureTL.to('#creature', { duration: .1, x: '-1rem'})
      
      let clickCardTl = gsap.timeline({repeat: 0})
      clickCardTl.to('.cards', {pointerEvents: "none"})
      clickCardTl.to('.cards', {delay: 1, pointerEvents: "auto"})

      const calcRemainingHP = creatureObj.health - card.str

      setCreatureObj(current => {
        return {...current, health: calcRemainingHP}
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
        
        if (calcRemainingHP <= 0){
          setPostBattle(true)
        }
      }
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

  const nextEncounter = () => {
    setPostBattle(false)
    setCreatureObj({health: 9, dmg: 2})

  }




  function reducer(state,action){
    if (action.type === 'add'){
      return {
        moneys: state.moneys + 1
      }
    }
    throw Error('Unknown action.');
  }
  



  return (
    <div className="App">


      {!gameStart && <PreGameScreen setGameStart={setGameStart} startGame={startGame}/>}
      {postBattle && <PostBattleScreen nextEncounter={nextEncounter} drawableCards={drawableCards}/>}
      <Header playerObject={playerObject} deck={deck} showDeck={showDeck} setShowDeck={setShowDeck}/>
      {gameStart && 
        <div>

        {/* <button onClick={testFunc}>TEST</button> */}
    

        <DrawPileScreen drawPile={drawPile} showDrawPile={showDrawPile} setShowDrawPile={setShowDrawPile} />

        {showDeck && <DeckScreen deck={deck}/>}
        
        <div id='discard-pile'>{discardPile.length}</div>

        <Creature creatureObj={creatureObj} setCreatureObj={setCreatureObj}/>
        <div id='hero' className='fixed top-[40vh] left-[40vw] h-[5rem] w-[5rem] bg-slate-200'>Hero</div>


        <div id="card-container">
          {cardsInHand.map((card, index) => (
            <Hand key={index} card={card} cardsInHand={cardsInHand} index={index} playCard={playCard} />
            ))
          }
        </div> 

        <div id='health-and-energy-container' className='font-bold'>
          <div id='health'>{playerObject.health}</div>
          <div id='energy'>{energy}</div>
          {shield !== 0 && <p>shield:{shield}</p>}
          
        </div>
        <div className='absolute bottom-[4rem] right-[10rem]'>
          <button className='text-[3rem] border-2 rounded p-2 bg-white' onClick={endTurn}>End Turn</button>
        </div>
      </div>}
    

    </div>
  );
}

export default App;
