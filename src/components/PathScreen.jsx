import { useEffect } from 'react'
// import gsap from 'gsap'
// import { useState } from 'react'


const PathScreen = ({nextEncounter, pathNode, setPathNode}) => {
  console.log('PN', pathNode)
  
  useEffect(() => {
  }, [])

  const nextNode = (id) => {
    if (id === 'l-1'){
      alert('hi')
    }
    else if (id === 'm-1'){

    }
    else if (id === 'r-1'){

    }
  }
  
  return (
    <div className="absolute z-50 top-0 w-screen h-screen bg-blue-200">
 
        <div className="w-screen flex justify-center gap-[15rem] mt-[15rem]">
          <div className="h-[35rem] flex flex-col justify-between">
            <div>
              <button>{pathNode[6][0].event}</button>
            </div>
            <div>
              <button>{pathNode[5][0].event}</button>
            </div>
            <div>
              <button>{pathNode[4][0].event}</button>
            </div>
            <div>
              <button>{pathNode[3][0].event}</button>
            </div>
            <div>
              <button>{pathNode[2][0].event}</button>
            </div>
            <div id='node-left-2' >
              <button>{pathNode[1][0].event}</button>
            </div>
            <div onClick={() => nextNode('l-1')}>
              <button>{pathNode[0][0].event}</button>
            </div>
          </div>


          <div className="h-[35rem] flex flex-col justify-between">
          <div>
              <button>{pathNode[6][1].event}</button>
            </div>
            <div>
              <button>{pathNode[5][1].event}</button>
            </div>
            <div>
              <button>{pathNode[4][1].event}</button>
            </div>
            <div>
              <button>{pathNode[3][1].event}</button>
            </div>
            <div>
              <button>{pathNode[2][1].event}</button>
            </div>
            <div>
              <button>{pathNode[1][1].event}</button>
            </div>
            <div onClick={() => nextNode('m-1')}>
              <button>{pathNode[0][1].event}</button>
            </div>
          </div>


          <div className="h-[35rem] flex flex-col justify-between">
          <div>
          <button>{pathNode[6][2].event}</button>
            </div>
            <div>
              <button>{pathNode[5][2].event}</button>
            </div>
            <div>
              <button>{pathNode[4][2].event}</button>
            </div>
            <div>
              <button>{pathNode[3][2].event}</button>
            </div>
            <div>
              <button>{pathNode[2][2].event}</button>
            </div>
            <div>
              <button>{pathNode[1][2].event}</button>
            </div>
            <div onClick={() => nextNode('r-1')}> 
              <button>{pathNode[0][2].event}</button>
            </div>
          </div>

        </div>
        <button onClick={nextEncounter}>Exit (temp button)</button>
    </div>
  )
}

export default PathScreen