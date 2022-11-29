

const DrawPileScreen = ({drawPile, showDrawPile, setShowDrawPile}) => {
  return (
    <div>
        <button onClick={() => setShowDrawPile(!showDrawPile)}>Show Draw Pile</button>
        {showDrawPile && 
        <div id='drawPileScreen'>

            {drawPile.map((deckCard, index) => (
                    <p className=''>id: {deckCard.id} str: {deckCard.str}</p>
                ))
                }
            
        </div>}

    </div>
  )
}

export default DrawPileScreen