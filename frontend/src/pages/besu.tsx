import ConnectWallet from '../components/Wallet';
import { useAccount } from 'wagmi';
import Head from 'next/head';
import { useState, useEffect, SetStateAction } from 'react';
import TokenBalance from '../components/TokenBalance';
import Image from 'next/image';
import besu from '../../public/besu.png';
import DeployToken from '@/components/DeployToken';
import GriefingLockToken from '../../utils/GriefingLockToken.json';

function Besu() {
    const {address} = useAccount();
    const [connected, setConnection] = useState(false);
    useEffect(() => {
        setConnection(String(address) !== "undefined")
        console.log(address);
    }
        , [address]);

    return(
        <>
            <Head>
                <title>Besu Transfer</title>
                <meta name="description" content="Besu Transfer" />
                <link rel="icon" href="/besu.png" />
            </Head>

            <div className='flex flex-col items-center pt-4 bg-[#1c589d] max-h-full w-full mb-5'>
                <div className='transition hover:rotate-180 transition-duration:100ms ease-in-out scale-75'>
                    <Image
                        src={besu}
                        alt=""
                        width={300}
                        height={300}
                    />
                </div>
                <h2 className="text-3xl font-bold mb-5 text-[#ada6c1]">
                    Besu Transfer
                </h2>
            </div>
            {connected && (
                <>
                    <TokenBalance addr={address}/>
                    <DeployToken></DeployToken>
                </>
            )}

            
        </>
    )
}

export default Besu;