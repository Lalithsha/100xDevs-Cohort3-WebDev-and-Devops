import { useState } from 'react'
import PropTypes from 'prop-types';
// import './App.css'

function App() {
  
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
}



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
}


export default App
