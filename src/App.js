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
import PathScreen from './components/PathScreen'

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
  const [pathScreen, setPathScreen] = useState(false)
  const [pathNode, setPathNode] = useState([])

  const [showDeck, setShowDeck] = useState(false)
  const [showDrawPile, setShowDrawPile] = useState(false)
  
  const [drawableCards, setDrawableCards] = useState([{id: null, str: 5, energy: 1}, {id: null, str: 7, energy: 2}, {id: null, str: 1, energy: 0}])
  const [numberDrawn, setNumberDrawn] = useState(0)

  // const [dummyState, setDummyState] = useState(0) 

  const [playerObject, setPlayerObject] = useState({health: 20, energy: 30, shield: 10, gold: 0})
  
  const [uuid, setUuid] = useState(100)

  const [discardPile, setDiscardPile] = useState([])
  const [drawPile, setDrawPile] = useState([])
  const [cardsInHand, setCardsInHand] = useState([])
  const [deck, setDeck] = useState([])

  const [currentCreatureIndex, setCurrentCreatureIndex] = useState(0)
  const [creatureArray, setCreatureArray ] = useState([{health: 5, dmg: 3}, {health: 7, dmg: 6}])
  const [creatureObj, setCreatureObj] = useState()

  useEffect(() => {
    // startGame()
    generatePath()
  }, [])

  const generatePath = () => {
    // const differentEvents = ['battle', 'event', 'shop']

    let buildArray = [ [], [], [], [], [], [], [] ]
    for (let i = 0; i < 7; i++){
      if (i === 0){
        buildArray[0].push({column: 'l', event: 'battle', level: 1})
        buildArray[0].push({column: 'm', event: 'battle', level: 1})
        buildArray[0].push({column: 'r', event: 'battle', level: 1})
      }
      else if (i === 1){
        buildArray[1].push({column: 'l', event: 'battle', level: 2})
        buildArray[1].push({column: 'm', event: 'event', level: 2})
        buildArray[1].push({column: 'r', event: 'shop', level: 2})
      }
      else if (i === 2){
        buildArray[2].push({column: 'l', event: 'battle', level: 2})
        buildArray[2].push({column: 'm', event: 'event', level: 2})
        buildArray[2].push({column: 'r', event: 'shop', level: 2})
      }
      else if (i === 3){
        buildArray[3].push({column: 'l', event: 'battle', level: 2})
        buildArray[3].push({column: 'm', event: 'event', level: 2})
        buildArray[3].push({column: 'r', event: 'shop', level: 2})
      }
      else if (i === 4){
        buildArray[4].push({column: 'l', event: 'battle', level: 2})
        buildArray[4].push({column: 'm', event: 'event', level: 2})
        buildArray[4].push({column: 'r', event: 'shop', level: 2})
      }
      else if (i === 5){
        buildArray[5].push({column: 'l', event: 'battle', level: 2})
        buildArray[5].push({column: 'm', event: 'event', level: 2})
        buildArray[5].push({column: 'r', event: 'shop', level: 2})
      }
      else if (i === 6){
        buildArray[6].push({column: 'l', event: 'battle', level: 2})
        buildArray[6].push({column: 'm', event: 'event', level: 2})
        buildArray[6].push({column: 'r', event: 'shop', level: 2})
      }
    }
    setPathNode(buildArray)
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

    setCreatureObj(creatureArray[currentCreatureIndex])
    // setCurrentCreatureIndex(currentCreatureIndex +1)
  }

  const endTurn = () => {
    // Temporarily disable End Turn Btn
    document.querySelector('#end-turn-btn').disabled = true

    // Animations
    let creatureTL = gsap.timeline({repeat: 0});
    creatureTL.to('#creature', {rotate: '-50deg', x: '-2rem'})
    creatureTL.to('#creature', {rotate: '0deg', x :'0'})

    let heroShakeTL = gsap.timeline({repeat: 0});
    heroShakeTL.to('#hero', {delay: .4, duration: .1, x: '1rem'})
    heroShakeTL.to('#hero', { duration: .1, x: '-1rem'})
    heroShakeTL.to('#hero', { duration: .1, x: '1rem'})
    heroShakeTL.to('#hero', { duration: .1, x: '-1rem'})

    function delayedEvents(){
      updatePlayerObject()
      updatePlayerHands()
      document.querySelector('#end-turn-btn').disabled = false
    }
    setTimeout(delayedEvents, 1000)
    

    function updatePlayerObject() {
      // Update player object to take damage ect.
      const remainingHealth =  playerObject.health - creatureObj.dmg
      const remainingEnergy = playerObject.energy
      // regain energy 
      if (playerObject.energy + 2 < 5){
        remainingEnergy = playerObject.energy + 2
      }
      
      setPlayerObject({health: remainingHealth, energy: remainingEnergy, shield: playerObject.shield, gold: playerObject.gold})
    }  
    
    function updatePlayerHands(){
      // if draw pile is empty, shuffle 
      if (notStateDrawPile.length === 0){
  
        // Since there are no more cards to draw loop over deck
        // and add card to draw pile checking to see if its already in play.
        for (let i = 0; i < notStateDeck.length; i++){
          if (notStateHand.includes(notStateDeck[i])){
          }
          else{
            notStateDrawPile.push(notStateDeck[i])
          }
        }

        setDrawPile(notStateDrawPile)
        notStateDiscardPile = []
        setDiscardPile([])
      }

      // if hand has less than 6 cards, draw a card
      if (notStateHand.length < 6){
        // draw first card
        let index = Math.floor(Math.random() * (notStateDrawPile.length - 0) + 0)
        let cardToBeDrawn = notStateDrawPile[index]
        notStateDrawPile.splice(index, 1)
        notStateHand.push(cardToBeDrawn)
    
        // draw second card if not over max cards
        if (notStateHand.length < 6){
          index = Math.floor(Math.random() * (notStateDrawPile.length - 0) + 0)
          cardToBeDrawn = notStateDrawPile[index]
          notStateDrawPile.splice(index, 1)
          notStateHand.push(cardToBeDrawn)
          setNumberDrawn(2)
        }
        else{
          setNumberDrawn(1)
        }
      }
      setCardsInHand(notStateHand)

    }
    

  }

  const [cardInPlay, setCardInPlay] = useState(false)

  const playCard = (card, index) => {
    // only allow function if animation is over
    if (!cardInPlay){
      // alert(cardInPlay)
      setCardInPlay(true)
      // if not enough energy
      if (card.energy > playerObject.energy){
      }
      // if energy check passed
      else{
        // change energy and shield
        setPlayerObject({health: 20, energy: playerObject.energy - card.energy, shield: card.shield, gold: 0})
  
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
        
          notStateHand.splice(index, 1)
          
          // Add the card object to Discard Pile array
          notStateDiscardPile.push({id: card.id, str: card.str})
          
          setCardsInHand(notStateHand)
          setDiscardPile(notStateDiscardPile)
          
          if (calcRemainingHP <= 0){
            setPostBattle(true)
          }
        }
      setTimeout(setCardInPlayToFalse, 1500)
    }

    function setCardInPlayToFalse(){
      setCardInPlay(false)
    
    }
  }

  const nextEncounter = () => {
    console.log(creatureArray[currentCreatureIndex])
    // used to resolve after rounds as a component updates the state hand, but the non state is behind
    notStateHand = []
    for (let i = 0; i < cardsInHand.length; i++){
      notStateHand.push(cardsInHand[i])
      console.log(cardsInHand[i])
    }

    // setPostBattle(false)
    // nextEncounter(false)
    setCreatureObj(creatureArray[currentCreatureIndex])
    setCurrentCreatureIndex(currentCreatureIndex +1)
    setPathScreen(false)
  }


  const testFunc = () =>{
    console.log('not stand hand',notStateHand)
    console.log('state hand',cardsInHand )
  }



  return (
    <div className="App">
  

      {!gameStart && <PreGameScreen setGameStart={setGameStart} startGame={startGame} setPathScreen={setPathScreen} />}
      {pathScreen && <PathScreen nextEncounter={nextEncounter} pathNode={pathNode} setPathNode={setPathNode} /> }
      {postBattle && <PostBattleScreen setPathScreen={setPathScreen} setPostBattle={setPostBattle} drawableCards={drawableCards} cardsInHand={cardsInHand} setCardsInHand={setCardsInHand} />}
      <Header playerObject={playerObject} deck={deck} showDeck={showDeck} setShowDeck={setShowDeck}/>
      {gameStart && 
          <div>

          <button onClick={testFunc}>TEST</button>
      
          <DrawPileScreen drawPile={drawPile} showDrawPile={showDrawPile} setShowDrawPile={setShowDrawPile} />

          {showDeck && <DeckScreen deck={deck}/>}
          
          <div id='discard-pile'>{discardPile.length}</div>

          <Creature creatureObj={creatureObj} setCreatureObj={setCreatureObj}/>
          <div id='hero' className='fixed top-[40vh] left-[40vw] h-[5rem] w-[5rem] bg-slate-200'>Hero</div>

          <div id="card-container">
            {cardsInHand.map((card, index) => (
              <Hand key={index} card={card} cardsInHand={cardsInHand} index={index} playCard={playCard} numberDrawn={numberDrawn}/>
              ))
            }
          </div> 

          <div id='health-and-energy-container' className='font-bold'>
            <div id='health'>{playerObject.health}</div>
            <div id='energy'>{playerObject.energy}</div>
            {playerObject.shield !== 0 && <p>shield:{playerObject.shield}</p>}
            
          </div>
          <div className='absolute bottom-[4rem] right-[10rem]'>
            <button className='text-[3rem] border-2 rounded p-2 bg-white' onClick={endTurn} id='end-turn-btn'>End Turn</button>
          </div>
        </div>
      }
    

    </div>
  );
}

export default App;
