'use client';

import ConnectWallet from '../components/Wallet';
import Head from 'next/head';
import Image from 'next/image';
import favi from '../../public/favicon.png';

function Home() {
  
  return(
    <>
      <Head>
          <title>Quick Swap Demonstration</title>
          <meta name="description" content="Quick Swap Demonstration" />
          <link rel="icon" href="/favicon.png" />
      </Head>

      <div className='flex flex-col items-center pt-4 bg-[#1c589d] max-h-full w-full mb-10'>
        <div className='transition hover:rotate-180 transition-duration:100ms ease-in-out scale-75'>
          <Image
            src={favi}
            alt=""
            width={500}
            height={500}
          />
        </div>
        <h2 className="text-3xl font-bold mb-10 text-[#ada6c1]">
          QuickSwap Demonstration
        </h2>
        <ConnectWallet />
        </div>
      <div className='flex items-center justify-center place-items-center bg-[#1c589d] mt-4 mb-4 gap-20 w-full'>
      </div>
    </>
  )
}

export default Home;