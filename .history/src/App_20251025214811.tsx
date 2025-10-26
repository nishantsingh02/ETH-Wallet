import { createConfig, WagmiProvider, http, useConnect } from "wagmi";
import { mainnet } from "viem/chains";
import { injected } from "wagmi/connectors";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function WalletConnector() {
  const { connectors, connect } = useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
}

function EthSend() {
  return (
    <div>
      <input type="text" placeholder="Address..." />
      <button>Send ETH</button>
    </div>
  );
}

export default App;
