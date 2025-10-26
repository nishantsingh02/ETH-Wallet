import { createConfig, useAccount, useBalance, useSendTransaction, WagmiProvider } from "wagmi";
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
  const {data: hash, sendTransection} = useSendTransaction();

  function sendEth() {
  sendTransection({
    to: (document.getElementById("to")).value ,
    value: "100000000000000000" // 0.1 Eth
  })
}

  return (
    <div>
      <input id = "to" type="text" placeholder="Address..." />
      <button id="value" onClick={sendEth}>Send ETH</button>
    </div>
  );
}


export default App;
