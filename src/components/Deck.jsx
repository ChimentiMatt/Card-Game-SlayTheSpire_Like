
const Deck = ({deckCard}) => {
    // console.log(deckCard)
  return (
    <div>
        <p className='deck-cards'>id: {deckCard.id} str: {deckCard.str}</p>
    </div>
  )
}

export default Deck