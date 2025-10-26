import { createConfig, injected } from 'wagmi'
import { mainnet} from 'viem/chains'
import { http } from 'wagmi'
import './App.css'
import { QueryClient } from '@tanstack/react-query'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected()
  ],
  transports: {
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient();

function App() {

  return (
    <>
      
    </>
  )
}

export default App
