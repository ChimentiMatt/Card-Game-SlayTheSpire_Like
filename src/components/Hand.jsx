import gsap from 'gsap'
import { useState, useEffect } from 'react'

const Hand = ({card, cardsInHand, index, playCard}) => {
    let rotationArray = [{deg: 0, y: 0}, {deg: 0, y: 0}]
    if (cardsInHand.length === 3) rotationArray = [{deg: -3, y: 10}, {deg: 0, y: 0}, {deg: 3, y: 10}]
    else if (cardsInHand.length === 4) rotationArray = [{deg: -6, y: 15}, {deg: -2, y: 0}, {deg: 2, y: 0}, {deg: 6, y: 15}]
    else if (cardsInHand.length === 5) rotationArray = [{deg: -12, y: 30}, {deg: -6, y: 1}, {deg: 0, y: -10}, {deg: 6, y: 1}, {deg: 12, y: 30}]    
    else if (cardsInHand.length === 6) rotationArray = [{deg: -15, y: 60}, {deg: -10, y: 20}, {deg: -3, y:  1}, {deg: 3, y: 1}, {deg: 10, y: 20}, {deg: 15, y: 60}]    


    useEffect(() => {
        // console.log(`${rotationArray[index].y}`)
    })

    const hoverZoom = (index, onOrOFf) => {
        // console.log(card)
        if (onOrOFf) gsap.to(`#card${index}`, {zoom: 1.75, y: '-7rem', x: '-3rem'})
        else gsap.to(`#card${index}`, {zoom: 1, y: '0rem', x: '0rem'})
    }   



    return (
    <div className="card" onClick={() => playCard(card.str, card, index)} onMouseEnter={() => hoverZoom(index, true)} onMouseLeave={() => hoverZoom(index, false)} style={{rotate: `${rotationArray[index].deg}deg`, top: `${rotationArray[index].y}px` }}>
        <div id={`card${index}`} className='inner-card'>
            <p>DMG: {card.str}</p>
            {/* {index} */}
            {/* {card.def} */}
            <p>id: {card.id}</p>
        </div>
    </div>
  )
}

export default Hand