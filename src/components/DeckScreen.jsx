import Deck from './Deck'

const DeckScreen = ({deck}) => {
  return (
    <div id='deck-screen'>
        <h1>Current Deck</h1>

        {deck.map((deckCard, index) => (
          <Deck key={index} deckCard={deckCard} />
          ))
        }
       
    </div>
  )
}

export default DeckScreen