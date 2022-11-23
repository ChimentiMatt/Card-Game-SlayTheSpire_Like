import { useState } from 'react'
const Creature = ({creatureObj, setCreatureObj}) => {
    return (
        <div id='creature'>Creature HP: {creatureObj.hp}</div>
    )
}

export default Creature