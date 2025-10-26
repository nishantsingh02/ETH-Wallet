import { injected } from 'wagmi'
import { mainnet, base } from 'viem/chains'
import http
import './App.css'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected()
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
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
