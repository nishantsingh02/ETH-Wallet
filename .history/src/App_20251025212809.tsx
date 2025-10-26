
import './App.css'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected()
  ],
  transports
})

function App() {

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
