
const Creature = ({creatureObj, setCreatureObj}) => {
    return (
        <div id='creature'>Creature HP: {creatureObj.hp} Attack:{creatureObj.dmg}</div>
    )
}

export default Creature