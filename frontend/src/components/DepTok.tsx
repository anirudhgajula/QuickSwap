import { useState } from 'react'
import { useSigner, useProvider } from 'wagmi'
import { ethers } from 'ethers'
import { tokenContractAddress } from '@/config'
import GriefingLockToken from '../../utils/GriefingLockToken.json'
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { Signer } from 'ethers'

function DepTok() {
  const [param1, setParam1] = useState('')
  const [param2, setParam2] = useState('')
  const [param3, setParam3] = useState('')
  const provider = useProvider();
  const signer = useSigner();

  const handleDeploy = async () => {
    const Factory = new ethers.ContractFactory(GriefingLockToken.abi, GriefingLockToken.bytecode, signer.connect(provider))
    const contract = await Factory.deploy(tokenContractAddress, param1, param2, param3)
    console.log(contract.address)
  }

  return (
    <>
      <Flex gap={5} flexDir="column" mt={6}>
      <Input
        type="text"
        placeholder="Receiver Address"
        onChange={(e) =>
            setParam1(e.target.value)
        }
      />
      <Input
        type="text"
        placeholder="Griefing Amount"
        onChange={(e) =>
            setParam2(ethers.utils.parseUnits(e.target.value, "ether").toString())
        }
      />
      <Input
        type="text"
        placeholder="Time Gap"
        onChange={(e) =>
            setParam3(e.target.value)
        }
      />
      <Button
        mt={8}
        isDisabled={!param1 || !param2 || !param3}
        onClick={handleDeploy}>
        Deploy
      </Button>
    </Flex>
    </>
  )
}

export default DepTok;