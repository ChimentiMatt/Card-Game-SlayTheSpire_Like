import gsap from 'gsap'
import { useState, useEffect } from 'react'

const Hand = ({card, cardsInHand, index, playCard, numberDrawn}) => {

    let rotationArray = [{deg: 0, y: 0}, {deg: 0, y: 0}]
    if (cardsInHand.length === 3) rotationArray = [{deg: -3, y: 10}, {deg: 0, y: 0}, {deg: 3, y: 10}]
    else if (cardsInHand.length === 4) rotationArray = [{deg: -6, y: 15}, {deg: -2, y: 0}, {deg: 2, y: 0}, {deg: 6, y: 15}]
    else if (cardsInHand.length === 5) rotationArray = [{deg: -12, y: 30}, {deg: -6, y: 1}, {deg: 0, y: -10}, {deg: 6, y: -1}, {deg: 12, y: 30}]    
    else if (cardsInHand.length === 6) rotationArray = [{deg: -15, y: 60}, {deg: -10, y: 20}, {deg: -1, y:  1}, {deg: 1, y: 1}, {deg: 10, y: 20}, {deg: 15, y: 60}]    

    useEffect(() => {
        rotateCards()
        animateCardsBeingAdded()

    }, [])
    
    const hoverZoom = (index, onOrOFf, offsetRotate) => {
        // find the offset of rotation so cards can be upright on hover with no rotation
        // let hoverOffset = offsetRotate - offsetRotate
        // // if hover 
        // if (onOrOFf){
        //      gsap.to(`#card${index}`, {duration: .0, rotate: '0deg', zoom: 1.75, y: '-7rem', x: '-3rem'})
        //      gsap.to(`.outerIndex${index}`, {duration: .0, rotate: `${hoverOffset}deg`})
        //     }
        // else {
        //     gsap.to(`#card${index}`, {duration: 0, zoom: 1, y: '0rem', x: '0rem'})
        //     gsap.to(`.outerIndex${index}`, {duration: 0, rotate: `${offsetRotate}deg`})
        // }
    }   

    const animateCardsBeingAdded = () => {
 

        // let cardAnimationTL = gsap.timeline({repeat: 0})
        // if (cardsInHand.length === 1){
        //     cardAnimationTL.to('#card0', {delay: 0, duration:0, left: '40vw', y: '10rem'})
        //     cardAnimationTL.to('#card0', {duration: 1, left: '0vh', y: '0rem'})     
        //     // targetCardsForAnimate('0')     

        // }

        // if (cardsInHand.length === 2){
        //     if (numberDrawn === 1){
        //         cardAnimationTL.to('#card1', {delay: 0, duration:0, left: '40vw', y: '10rem'})
        //         cardAnimationTL.to('#card1', {duration: 1, left: '0vh', y: '0rem'})
        //     }
        //     else if (numberDrawn === 2){
        //         cardAnimationTL.to('#card0, #card1', {delay: 0, duration:0, left: '40vw', y: '10rem'})
        //         cardAnimationTL.to('#card0, #card1', {duration: 1, left: '0vh', y: '0rem'})
        //     }
        //   }
        // if (cardsInHand.length === 2){
        // if (numberDrawn === 1){
        //     cardAnimationTL.to('#card1', {delay: 0, duration:0, left: '40vw', y: '10rem'})
        //     cardAnimationTL.to('#card1', {duration: 1, left: '0vh', y: '0rem'})
        // }
        // else if (numberDrawn === 2){
        //     cardAnimationTL.to('#card0, #card1', {delay: 0, duration:0, left: '40vw', y: '10rem'})
        //     cardAnimationTL.to('#card0, #card1', {duration: 1, left: '0vh', y: '0rem'})
        // }
        // }
    }

    const targetCardsForAnimate = (id) => {
        // let cardAnimationTL = gsap.timeline({repeat: 0})
        // if (cardsInHand.length === 1){
        //     cardAnimationTL.to(`#card${id}`, {delay: 0, duration:0, left: '40vw', y: '10rem'})
        //     cardAnimationTL.to(`#card${id}`, {duration: 1, left: '0vh', y: '0rem'})          
        // }
    }



    const rotateCards = () => {

        // Find what array should be used and update the variable 
        rotationArray = [{deg: 0, y: 0}, {deg: 0, y: 0}]
        if (cardsInHand.length === 3) rotationArray = [{deg: -3, y: 10}, {deg: 0, y: 0}, {deg: 3, y: 10}]
        else if (cardsInHand.length === 4) rotationArray = [{deg: -6, y: 15}, {deg: -2, y: 0}, {deg: 2, y: 0}, {deg: 6, y: 15}]
        else if (cardsInHand.length === 5) rotationArray = [{deg: -12, y: 30}, {deg: -6, y: 1}, {deg: 0, y: -10}, {deg: 6, y: -1}, {deg: 12, y: 30}]    
        else if (cardsInHand.length === 6) rotationArray = [{deg: -15, y: 60}, {deg: -10, y: 20}, {deg: -1, y:  1}, {deg: 1, y: 1}, {deg: 10, y: 20}, {deg: 15, y: 60}]   

        // rotate all cards according to the array
        if (cardsInHand.length > 1){
            for (let i = 0; i < rotationArray.length; i++){
                gsap.to(`.outerIndex${i}`, {duration: 0, rotate: `${rotationArray[i].deg}deg`, top:  `${rotationArray[i].y}px`})
            }
        }
    }


    return (
    <div id='hand-container' className={`handCardOuter outerIndex${index}`} onClick={() => { playCard(card, index);rotateCards(); }} onMouseEnter={() => hoverZoom(index, true, rotationArray[index].deg)} onMouseLeave={() => hoverZoom(index, false, rotationArray[index].deg)} >
        <div id={`card${index}`} className='cards'>
            {index}
            <p>DMG: {card.str}</p>
            <p>Energy Cost: {card.energy} </p>
          
            {card.shield !== 0 && <p>shield: {card.shield}</p>}
           
            <p>id: {card.id}</p>
        </div>
    </div>
  )
}

export default Hand