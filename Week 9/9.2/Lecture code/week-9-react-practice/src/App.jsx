import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  // let counterVisible = true;

  const[counterVisible, setCounterVisible] = useState(true);

  useEffect(()=>{
    setInterval(()=>{
      setCounterVisible(c=>!c);
    },5000)
  },[])
  
  return (
    <>
        <div>
          hi
          {counterVisible? <Counter></Counter>:null}
          hello ji
        </div>
        
    </>
  )
}

function Counter(){

  const [count, setCount] = useState(0)
  

  /* useEffect(()=>{
      setInterval(() => {
        setCount(count=>count+1);
      }, 1000);
  },[]) */

  useEffect(function(){
    // setInterval return a clock value. which is in future used in clean up the time once the it is unmounted (logic to the current code)
    // If not cleaned up clock will run infinitely
    /* let clock =  setInterval(() => {
      // setCount(count=>count+1)
      setCount(function(cnt){
        return cnt+1;
      })
    }, 1000); */

    let clock =  setInterval(function() {
      // setCount(count=>count+1)
      setCount(function(cnt){
        return cnt+1;
      })
    }, 1000);

    return function(){
      clearInterval(clock)
    }
    
  },[])
  
  const increaseCount = ()=> {
    setCount(count+1);
  }
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={increaseCount} >Increase counter</button>
    </div>
  )
}

export default App
