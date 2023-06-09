import { Interface, hexZeroPad } from "ethers/lib/utils";
import { BigNumber } from "ethers";

export function encodeConstructorData(
  abi: Interface,
  args?: Array<string | BigNumber>,
  libraries?: Array<string>
) {
  if (libraries) {
    for (let i = 0; i < libraries.length; i++) {
      libraries[i] = hexZeroPad(libraries[i], 20);
    }
  }

  let constructorData;
  if (args && libraries) {
    constructorData = abi.encodeDeploy([...libraries, ...args]);
  } else if (args) {
    constructorData = abi.encodeDeploy([...args]);
  } else if (libraries) {
    constructorData = abi.encodeDeploy([...libraries]);
  }
  return constructorData;
}