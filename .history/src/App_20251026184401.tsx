import {
  createConfig,
  useAccount,
  useBalance,
  useSendTransaction,
  WagmiProvider,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "viem/chains";
import { http } from "wagmi";
import "./App.css";
import { useConnect } from "wagmi";
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
        {/* This main container wraps the whole app */}
        <div>
          <h1 className="headin">ETH Wallet</h1>
        </div>
        <div className="wallet-container">
          <WalletConnector />
          <MyAddress />
          <EthSend />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function MyAddress() {
  // Get connection status
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  // Only render this component if connected
  if (!isConnected) {
    return null;
  }

  return (
    <div className="account-section">
      <div className="section-header">Account Info</div>
      <div className="address-info">
        <span>Address:</span> {address}
        <br />
        <span>Balance:</span>{" "}
        {balance
          ? `${balance.formatted} ${balance.symbol}`
          : "Loading..."}
      </div>
    </div>
  );
}

function WalletConnector() {
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();

  // Only show connect buttons if not already connected
  if (isConnected) {
    return null;
  }

  return (
    <div className="connector-section">
      <div className="section-header">Connect Wallet</div>
      <div className="connector-container">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="connect-btn" // Added class
          >
            Connect {connector.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function EthSend() {
  const { data: hash, sendTransaction } = useSendTransaction();
  const { isConnected } = useAccount();

  function sendEth() {
    const toAddress = (document.getElementById("to") as HTMLInputElement).value;
    
    // Use BigInt for currency values
    sendTransaction({
      to: toAddress as `0x${string}`, // Cast to the required type
      value: BigInt("100000000000000000"), // 0.1 Eth
    });
  }

  // Only render this component if connected
  if (!isConnected) {
    return null;
  }

  return (
    <div className="send-tx-container">
      <div className="section-header">Send ETH</div>
      <input
        id="to"
        type="text"
        placeholder="Address (e.g., 0x...)"
        className="address-input" // Added class
      />
      <button onClick={sendEth} className="send-btn"> {/* Added class */}
        Send 0.1 ETH
      </button>

      {/* Show the transaction hash if it exists */}
      {hash && (
        <div className="tx-hash">
          <strong>Tx Hash:</strong> {hash}
        </div>
      )}
    </div>
  );
}

export default App;




























// import { createConfig, useAccount, useBalance, useSendTransaction, WagmiProvider } from "wagmi";
// import { injected } from "wagmi/connectors";
// import { mainnet } from "viem/chains";
// import { http } from "wagmi";
// import "./App.css";
// import { useConnect } from 'wagmi'
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// export const config = createConfig({
//   chains: [mainnet],
//   connectors: [injected()],
//   transports: {
//     [mainnet.id]: http(),
//   },
// });

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <WalletConnector />
//         <EthSend />
//         <MyAddress />
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

// function MyAddress() {
//   const { address }= useAccount();
//   const balance = useBalance({ address });

//   return <div>
//     {address}
//     <br />
//     {address ? balance.data?.formatted : "Connect Wallet to see the balance"}
//   </div>
// }

// function WalletConnector() {

//   const { connectors, connect } = useConnect()

//   // [{name: "BackPack", uid : "bpc"}, {name: "Phatom", uid: "xxx"}]

//   return connectors.map((connector) => (
//     <button key={connector.uid} onClick={() => connect({ connector })}>
//       {connector.name}
//     </button>
//   ))
// }

// function EthSend() {
//   const {data: hash, sendTransaction} = useSendTransaction();

//   function sendEth() {
//   sendTransaction({
//     to: (document.getElementById("to") as any).value ,
//     value: "100000000000000000" // 0.1 Eth
//   })
// }

//   return (
//     <div>
//       <input id = "to" type="text" placeholder="Address..." />
//       <button id="value" onClick={sendEth}>Send ETH</button>
//     </div>
//   );
// }


// export default App;
