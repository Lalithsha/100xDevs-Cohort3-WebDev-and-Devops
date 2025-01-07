/* import { useState } from 'react'
import PropTypes from 'prop-types'; */
import './App.css'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { counterAtom } from './store/atom/counter';

function App() {
  
  
  
  return (
    <RecoilRoot>
    <Counter/>
    </RecoilRoot>
  )
}


function Counter(){

  /* Way-using props to achieve 
  const [count, setCount] = useState(0);
  
  return (
    <>
     <div>
      <CurrentCount  count={count} />
      <Increment setCount={setCount} />
      <Decrease setCount={setCount} />
     </div>
    </>
  )
    */

  return (
    <>
     <div>
      <CurrentCount />
      <Increment />
      <Decrease />
     </div>
    </>
  )
  
  
}

function CurrentCount(){

  const count =  useRecoilValue(counterAtom);
  
  return(
    <div>
      {count}
    </div>
  )
}


function Increment(){


  const setCount = useSetRecoilState(counterAtom);
  
  function increase(){
    setCount(c=>c+1);
  }
  
  return (
  <div>
    <button onClick={increase}>Increment</button>
  </div>
  )
}


function Decrease(){

  const setCount = useSetRecoilState(counterAtom);

  function decrease(){
    setCount(c=>c-1);
  }
  
  return (
  <div>
    <button onClick={decrease}>Decrease</button>
  </div>
  )
} 

/* 
// Way-using props to achieve 
function CurrentCount({count}){
  return(
    <div>
      {count}
    </div>
  )
}

// This fixes propType error for eslint
CurrentCount.propTypes = {
  count: PropTypes.number.isRequired,
}


function Increment({setCount}){

  function increase(){
    setCount(c=>c+1);
  }
  
  return (
  <div>
    <button onClick={increase}>Increment</button>
  </div>
  )
}

function Decrease({setCount}){

  function decrease(){
    setCount(c=>c-1);
  }
  
  return (
  <div>
    <button onClick={decrease}>Decrease</button>
  </div>
  )
} */


export default App
