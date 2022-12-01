
const Creature = ({creatureObj, setCreatureObj}) => {
    return (
        <div id='creature'>Creature HP: {creatureObj.health} Attack:{creatureObj.dmg}</div>
    )
}

export default Creature