import { useState } from 'react'
import { useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { tokenContractAddress } from '@/config'
import GriefingLockToken from '../../utils/GriefingLockToken.json'
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { Signer } from 'ethers'
import { besu } from '@/besu'

function DeployToken() {
  const [param1, setParam1] = useState('')
  const [param2, setParam2] = useState('')
  const [param3, setParam3] = useState('')
  const [address, setDeployedAddress] = useState('')
  const signer = useSigner({chainId: besu.id});

  const handleDeploy = async () => {
    const Factory = new ethers.ContractFactory(GriefingLockToken.abi, GriefingLockToken.bytecode, signer.data!)
    const contract = await Factory.deploy(tokenContractAddress, param1, param2, param3)
    setDeployedAddress(contract.address)
    console.log(address)
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
        onChange={(e) => {
            try {
              BigInt(e.target.value);
              setParam2(ethers.utils.parseUnits(e.target.value, "ether").toString());
            }
            catch {
              console.log("Please enter a valid numeric value for Griefing Amount");
            }

          }
        }
      />
      <Input
        type="text"
        placeholder="Time Gap"
        onChange={(e) => {
            try {
              BigInt(e.target.value);
              setParam3(e.target.value);
            }
            catch {
              console.log("Please enter a valid numeric value for Time Gap");
            }
            
          }
        }
      />
      <Button
        mt={8}
        colorScheme='gray'
        size='lg'
        isDisabled={!param1 || !param2 || !param3}
        onClick={handleDeploy}>
        Deploy
      </Button>
    </Flex>
    </>
  )
}

export default DeployToken;