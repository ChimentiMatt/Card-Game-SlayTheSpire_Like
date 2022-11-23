import { useState, useEffect } from 'react'
import Hand from './components/Hand';
import Creature from './components/Creature';
import './styles.css'


function App() {
  let uuid = 4
  const [cards, setCards] = useState([
    { id: 1, str: 1, def: 2},
    { id: 2, str: 2, def: 3},
    { id: 3, str: 3, def: 3},
  ])
  

  const [discardPile, setDiscardPile] = useState([])

  const [creatureObj, setCreatureObj] = useState({hp: 20})

  const draw = () => {
        // setCards(current => [...current,{ str: 4, def: 3},])
          setCards(current => [...current, createCard(),])
      
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

    // add card object to discard pile array
    setDiscardPile([...discardPile,{id:card.id, str: card.str}]
    )

  }

  const createCard = () =>{
    const str = Math.floor(Math.random() * (6 - 1) + 1); // The maximum is 
    const def = Math.floor(Math.random() * (6 - 1) + 1); // The maximum is 
    uuid++
    return { id: uuid, str: str, def: def}
  }

  const testFunc = () => {
    console.log('discard pile object', discardPile)

  }


  return (
    <div className="App">
      <h1>cards</h1>
      <button onClick={testFunc}>TEST</button>
      
      <div id='discardPile'>{discardPile.length}</div>
      <Creature creatureObj={creatureObj} setCreatureObj={setCreatureObj}/>
      <div id="cardContainer">
        {cards.map((card, index) => (
          <Hand key={index} card={card} cards={cards} index={index} playCard={playCard} />
        ))
      }
      </div>
      <button onClick={draw}>Draw</button>
    </div>
  );
}

export default App;
