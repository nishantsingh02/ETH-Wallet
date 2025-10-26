import { createConfig, injected ,useConnect, WagmiProvider } from "wagmi";
import { mainnet } from "viem/chains";
import { http } from "wagmi";
import "./App.css";
import connec
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

  const { connectors, connect } = useConnect()

  // [{name: "BackPack", uid : "bpc"}, {name: "Phatom", uid: "xxx"}]

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
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
