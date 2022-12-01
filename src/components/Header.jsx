export const Header = ({playerObject, showDeck, setShowDeck}) => {

    return (
        <div className="w-screen h-[2rem] bg-teal-500 flex justify-between pl-[2rem] pr-[2rem]">
            <button onClick={() => setShowDeck(!showDeck)}>Deck</button>
            <div >Gold: {playerObject.gold}</div>
            
        </div>
    )
}

export default Header