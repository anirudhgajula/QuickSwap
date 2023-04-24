import { useContractRead, useProvider } from 'wagmi';

import { BigNumber, ethers } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { tokenContractAddress } from '../config.js'
import NewToken from '../../utils/NewToken.json'

const TokenBalance: FC<{addr: `0x${string}` | undefined}> = ({addr}) => {

    const provider = useProvider();
    const test = provider.getCode(tokenContractAddress);
    console.log(test);

    const {data} = useContractRead({
        address: tokenContractAddress,
        abi: NewToken.abi,
        functionName: 'balanceOf',
        args: [addr],
        watch: true
    });
    // Hooks are used to prevent hydration error
    const [val, setVal] = useState('0');
    // useEffect Hook, if data changes it runs again.
    useEffect(() => {
        setVal(String(data) == "undefined" ? "0" : String(ethers.utils.formatEther(data as string)).split(".")[0]);
    }, [data]);

    return (
        <div className='flex items-center justify-center place-items-center mt-2 gap-3 w-full'>
            <span className='text-3xl align-middle font-bold'>
                User Balance
            </span>
            <span className='text-3xl align-middle font-medium'>
                {val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} NT
            </span>
        </div>
    );
};

export default TokenBalance;