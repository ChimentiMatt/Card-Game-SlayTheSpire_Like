import { useState } from 'react'
const Creature = ({creatureObj, setCreatureObj}) => {
    return (
        <div id='creature'>{creatureObj.hp}</div>
    )
}

export default Creature