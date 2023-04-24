'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

export default function ConnectWallet() {
    // State / Props
    const [hasMounted, setHasMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new MetaMaskConnector(),
    });
    const { disconnect } = useDisconnect()

    // Hooks
    useEffect(() => {
        setHasMounted(true);
    }, [])

    // Render
    if (!hasMounted) return null;

    return (
        <div>
            {!isConnected
                ? <div>
                    <button className="h-10 bg-blue-600 text-white px-6 rounded-full hover:bg-blue-800 transition-colors ease-in-out duration-200" onClick={() => connect()}>Connect Wallet</button>
                </div>
                : <div className='flex items-center justify-center place-items-center mt-2 mb-4 gap-3 w-full'>
                    <code className="bg-zinc-700 text-zinc-200 p-4 rounded block mb-4"><pre>{address}</pre></code>
                    <button className="h-10 bg-red-600 text-white px-6 rounded-full hover:bg-red-800 transition-colors ease-in-out duration-200" onClick={() => disconnect()}>Disconnect Wallet</button>
                </div>}
        </div>
    );
};