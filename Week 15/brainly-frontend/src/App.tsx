import './App.css'
import { Button } from './components/ui/Button'
import Card from './components/ui/Card'
import { PlusIcon } from './icons/Plus'

function App() {
  
  const handleButtonClick = ()=>{
    console.log("Button Clicked")
  }

  return (
    <>
      <Button startIcon={<PlusIcon size='sm' />} variant='primary'text='Share' size='sm' onClick={handleButtonClick} ></Button>
      <Button startIcon={<PlusIcon size="lg" />} variant='primary'text='Share' size='md' onClick={handleButtonClick} ></Button>
      <Button variant='secondary'text='Add' size='lg' onClick={handleButtonClick} ></Button>

      <Card/>
      
    </>
  )
}

export default App
