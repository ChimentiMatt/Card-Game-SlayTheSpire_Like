import gsap from 'gsap'
import { useState, useEffect, index } from 'react'

const Hand = ({card, cards, index, playCard}) => {
    let rotationArray = [{deg: 0, y: 0}, {deg: 0, y: 0}]
    if (cards.length === 3) rotationArray = [{deg: -3, y: 10}, {deg: 0, y: 0}, {deg: 3, y: 10}]
    else if (cards.length === 4) rotationArray = [{deg: -6, y: 15}, {deg: -2, y: 0}, {deg: 2, y: 0}, {deg: 6, y: 15}]
    else if (cards.length === 5) rotationArray = [{deg: -12, y: 30}, {deg: -6, y: 1}, {deg: 0, y: -10}, {deg: 6, y: 1}, {deg: 12, y: 30}]    


    useEffect(() => {
        console.log(`${rotationArray[index].y}`)
    })



    return (
    <div className="card card1" onClick={() => playCard(card.str, card)} style={{rotate: `${rotationArray[index].deg}deg`, top: `${rotationArray[index].y}px` }}>
        {card.str}
        {/* {index} */}
        {/* {card.def} */}
    </div>
  )
}

export default Hand