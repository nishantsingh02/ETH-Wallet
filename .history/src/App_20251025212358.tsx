import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <input type='text' placeholder='Address...' />
        <button>Send ETH</button>
      </div>
    </>
  )
}

export default App
