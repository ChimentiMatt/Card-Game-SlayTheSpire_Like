import { useState, useEffect } from 'react'
import Hand from './components/Hand';
import Creature from './components/Creature';
import './styles.css'

function App() {
  const [uuid, setUuid] = useState(4)
  const [health, setHealth] = useState(20)
  const [energy, setEnergy] = useState(2)
  const [cards, setCards] = useState([
    { id: 1, str: 1, def: 2},
    { id: 2, str: 2, def: 3},
    { id: 3, str: 3, def: 3},
  ])

  const [discardPile, setDiscardPile] = useState([])

  const [creatureObj, setCreatureObj] = useState({hp: 20})

  const draw = () => {
    console.log(cards.length)
    // setCards(current => [...current,{ str: 4, def: 3},])
    if (cards.length < 6){
      setCards(current => [...current, createCard(),])
    }
  }

  const playCard = (damage, card) => {

    const calcDamage = creatureObj.hp - damage
    setCreatureObj(current => {
      return {...current, hp: calcDamage}
    })

    // Remove Card
    setCards(current => 
      current.filter(element => {
        return element.id !== card.id
    }))

    // Add a card object to Discard Pile array
    setDiscardPile([...discardPile,{id:card.id, str: card.str}]
    )

  }

  const createCard = () =>{
    const str = Math.floor(Math.random() * (6 - 1) + 1)
    const def = Math.floor(Math.random() * (6 - 1) + 1)

    setUuid(uuid + 1)
    return { id: uuid, str: str, def: def}
  }

  const testFunc = () => {
    console.log('discard pile object', discardPile)

  }


  return (
    <div className="App">
      <h1>cards</h1>
      <button onClick={testFunc}>TEST</button>
      <button onClick={draw}>Draw</button>
      
      <div id='discard-pile'>{discardPile.length}</div>

      <Creature creatureObj={creatureObj} setCreatureObj={setCreatureObj}/>


      <div id="card-container">
        {cards.map((card, index) => (
          <Hand key={index} card={card} cards={cards} index={index} playCard={playCard} />
          ))
        }
      </div>
    

      <div id='health-and-energy-container'>
        <div id='health'>{health}</div>
        <div id='energy'>{energy}</div>
        {/* {uuid} */}
      </div>
    </div>
  );
}

export default App;
