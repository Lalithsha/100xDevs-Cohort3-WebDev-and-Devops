
import './App.css'
// import { Otp } from './components/Otp.tsx'
import InputCode  from './components/Otp.tsx'

function App() {

  return (
    <div className='h-screen bg-blue-700'>
      <br/><br/><br/><br/>
      <InputCode length={20} loading={false} onComplete={(code) => console.log(code)} />
    </div>
  )
}

export default App
