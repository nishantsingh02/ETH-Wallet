import {
  createConfig,
  WagmiProvider,
  useAccount,
  useBalance,
  useSendTransaction,
  useConnect,
} from "https://esm.sh/wagmi@2.9.2";
import { injected } from "https://esm.sh/wagmi@2.9.2/connectors";
import { mainnet } from "https://esm.sh/viem@2.13.0/chains";
import { http, parseEther } from "https://esm.sh/viem@2.13.0";
import {
  QueryClient,
  QueryClientProvider,
} from "https://esm.sh/@tanstack/react-query@5.40.0";
import React, { useState } from "react";

// --- Configuration ---
// We define the Wagmi config and React Query client at the top level.
export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

// --- SVG Icons ---
// Using inline SVG components to keep everything in one file and look great.

const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const LogOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// --- Main App Component ---
// This is the root component that provides the Wagmi and QueryClient context.
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* We wrap the entire app in a styled container */}
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
          <WalletUI />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// --- WalletUI Component ---
// This component conditionally renders the appropriate UI
// based on the wallet's connection status.
function WalletUI() {
  const { isConnected } = useAccount();

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-white">
        My Web3 Wallet
      </h1>
      {/* Show account info and send form if connected */}
      {isConnected ? (
        <>
          <MyAddress />
          <EthSend />
        </>
      ) : (
        /* Show connect buttons if not connected */
        <WalletConnector />
      )}
    </div>
  );
}

// --- MyAddress Component ---
// Displays the connected user's address and balance.
// Now includes a "Disconnect" button.
function MyAddress() {
  const { address, isConnecting } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });
  // We get the `disconnect` function from `useConnect`
  const { disconnect } = useConnect();

  if (isConnecting) {
    return (
      <div className="text-center text-gray-400 p-4">Connecting...</div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-gray-700 rounded-lg shadow-inner">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-100">
          <UserIcon />
          Account
        </h2>
        <button
          onClick={() => disconnect()}
          className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 font-medium transition-colors"
        >
          <LogOutIcon />
          Disconnect
        </button>
      </div>
      <div className="text-sm break-all">
        <span className="font-medium text-gray-400">Address: </span>
        <span className="text-gray-200">{address}</span>
      </div>
      <div>
        <span className="font-medium text-gray-400">Balance: </span>
        <span className="text-gray-200">
          {isLoading
            ? "Loading..."
            : balance
            ? `${balance.formatted} ${balance.symbol}`
            : "N/A"}
        </span>
      </div>
    </div>
  );
}

// --- WalletConnector Component ---
// Renders buttons for each available wallet connector.
function WalletConnector() {
  const { connectors, connect, isPending } = useConnect();

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-center text-gray-300">
        Connect your wallet
      </h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          disabled={isPending}
        >
          <WalletIcon />
          {isPending ? "Connecting..." : connector.name}
        </button>
      ))}
    </div>
  );
}

// --- EthSend Component ---
// This component is now a form that uses React state to manage inputs,
// which is safer and fixes the "as any" issue.
function EthSend() {
  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  async function sendEth(e) {
    e.preventDefault(); // Prevent form from reloading the page
    setError("");

    // Basic validation
    if (!to || !value) {
      setError("Please fill in both fields.");
      return;
    }

    let valueInWei;
    try {
      // Use parseEther from viem to convert ETH string to Wei BigInt
      valueInWei = parseEther(value);
    } catch {
      setError("Invalid amount. Please enter a number (e.g., 0.01).");
      return;
    }

    // Send the transaction
    sendTransaction({ to: to, value: valueInWei });
  }

  return (
    <form
      onSubmit={sendEth}
      className="space-y-4 p-4 bg-gray-700 rounded-lg shadow-inner"
    >
      <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-100">
        <SendIcon />
        Send ETH
      </h2>

      {/* Recipient Address Input */}
      <div>
        <label
          htmlFor="to"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Recipient Address
        </label>
        <input
          id="to"
          type="text"
          placeholder="0x..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Amount Input - This is new and much more user-friendly */}
      <div>
        <label
          htmlFor="value"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Amount (ETH)
        </label>
        <input
          id="value"
          type="text"
          placeholder="0.01"
          value={value}
          onChange={(e) => setValue(e.Ttarget.value)}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Send Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
      >
        {isPending ? "Sending..." : "Send Transaction"}
      </button>

      {/* Error Message Display */}
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}

      {/* Success Message Display */}
      {hash && (
        <div className="text-sm text-green-400 text-center break-all">
          <p className="font-medium mb-1">Success! Transaction Hash:</p>
          <a
            href={`https://mainnet.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-300 flex items-center justify-center gap-1"
          >
            <span>{`${hash.substring(0, 10)}...${hash.substring(
              hash.length - 8
            )}`}</span>
            <LinkIcon />
          </a>
        </div>
      )}
    </form>
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
