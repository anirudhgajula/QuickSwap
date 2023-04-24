import React from "react";
import { useContractDeploy } from "../hooks/useContractDeploy";
import { Interface } from "ethers/lib/utils";
import { DeployProps } from "../types";
import { Griefing_Factory } from "../hooks/Griefing_Factory";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { ethers } from "ethers";
import { tokenContractAddress } from "../config.js";
import GriefingLockToken from '../../utils/GriefingLockToken.json';

const abi = GriefingLockToken.abi;
const bytecode = Griefing_Factory.bytecode;

const Deploy = ({
  args,
  setContractAddress,
  setArgs,
  setStage,
}: DeployProps) => {
  const { deployContract, values } = useContractDeploy({
      abi,
      bytecode,
      args: Object.values(args),
      setContractAddress,
      setStage,
  });

  setArgs((prev) => {
    return { ...prev, addressToken: tokenContractAddress}
  })

  return (
    <Flex gap={5} flexDir="column" mt={6}>
      <Input
        type="text"
        placeholder="receiverAddress"
        onChange={(e) =>
          setArgs((prev) => {
            return { ...prev, addressReceiver: e.target.value };
          })
        }
      />
      <Input
        type="text"
        placeholder="griefingAmount"
        onChange={(e) =>
          setArgs((prev) => {
            return { ...prev, tokenAmount: ethers.utils.parseUnits(e.target.value, "ether").toString() };
          })
        }
      />
      <Input
        type="text"
        placeholder="timeGap"
        onChange={(e) =>
          setArgs((prev) => {
            return { ...prev, symbol: e.target.value };
          })
        }
      />
      <Button
        mt={8}
        isLoading={values.isLoading}
        isDisabled={!args.addressReceiver || !args.timeGap || !args.tokenAmount}
        loadingText="Deploying"
        onClick={deployContract}>
        Deploy
      </Button>
      <Center mt={1} visibility={values.isError ? "visible" : "hidden"}>
        <Flex gap={3} alignItems="center">
          <WarningIcon w={4} h={4} color="red.500" />
          <Text>Failed</Text>
        </Flex>
      </Center>
    </Flex>
  );
};

export default React.memo(Deploy);