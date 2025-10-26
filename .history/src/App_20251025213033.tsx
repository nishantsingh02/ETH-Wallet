import { createConfig, injected } from 'wagmi'
import { mainnet, base } from 'viem/chains'
import { http } from 'wagmi'
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

const 

function App() {

  return (
    <>
      <
    </>
  )
}

export default App
