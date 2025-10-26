import { createConfig, useAccount, useBalance, useTransaction, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "viem/chains";
import { http } from "wagmi";
import "./App.css";
import { useConnect } from 'wagmi'
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
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function MyAddress() {
  const { address }= useAccount();
  const balance = useBalance({ address });

  return <div>
    {address}
    <br />
    {address ? balance.data?.formatted : "Connect Wallet to see the balance"}
  </div>
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
      <button onClick={sendTransection}>Send ETH</button>
    </div>
  );
}

function sendTransection() {
  const {data, sendTransection} = useTransaction
}

export default App;
