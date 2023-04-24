/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
    BaseContract,
    BigNumber,
    BigNumberish,
    BytesLike,
    CallOverrides,
    ContractTransaction,
    Overrides,
    PopulatedTransaction,
    Signer,
    utils,
  } from "ethers";
  import type {
    FunctionFragment,
    Result,
    EventFragment,
  } from "@ethersproject/abi";
  import type { Listener, Provider } from "@ethersproject/providers";
  import type {
    TypedEventFilter,
    TypedEvent,
    TypedListener,
    OnEvent,
    PromiseOrValue,
  } from "./common";
  
  export interface GriefingLockInterface extends utils.Interface {
    functions: {
      "changeTimeGap(uint256)": FunctionFragment;
      "deployPrincipal(uint256)": FunctionFragment;
      "depositGriefingTokens()": FunctionFragment;
      "getPrincipalLock()": FunctionFragment;
      "getUnlockTime()": FunctionFragment;
      "owner()": FunctionFragment;
      "refund()": FunctionFragment;
      "renounceOwnership()": FunctionFragment;
      "setRefund()": FunctionFragment;
      "transferOwnership(address)": FunctionFragment;
      "withdraw()": FunctionFragment;
    };
  
    getFunction(
      nameOrSignatureOrTopic:
        | "changeTimeGap"
        | "deployPrincipal"
        | "depositGriefingTokens"
        | "getPrincipalLock"
        | "getUnlockTime"
        | "owner"
        | "refund"
        | "renounceOwnership"
        | "setRefund"
        | "transferOwnership"
        | "withdraw"
    ): FunctionFragment;
  
    encodeFunctionData(
      functionFragment: "changeTimeGap",
      values: [PromiseOrValue<BigNumberish>]
    ): string;
    encodeFunctionData(
      functionFragment: "deployPrincipal",
      values: [PromiseOrValue<BigNumberish>]
    ): string;
    encodeFunctionData(
      functionFragment: "depositGriefingTokens",
      values?: undefined
    ): string;
    encodeFunctionData(
      functionFragment: "getPrincipalLock",
      values?: undefined
    ): string;
    encodeFunctionData(
      functionFragment: "getUnlockTime",
      values?: undefined
    ): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "refund", values?: undefined): string;
    encodeFunctionData(
      functionFragment: "renounceOwnership",
      values?: undefined
    ): string;
    encodeFunctionData(functionFragment: "setRefund", values?: undefined): string;
    encodeFunctionData(
      functionFragment: "transferOwnership",
      values: [PromiseOrValue<string>]
    ): string;
    encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  
    decodeFunctionResult(
      functionFragment: "changeTimeGap",
      data: BytesLike
    ): Result;
    decodeFunctionResult(
      functionFragment: "deployPrincipal",
      data: BytesLike
    ): Result;
    decodeFunctionResult(
      functionFragment: "depositGriefingTokens",
      data: BytesLike
    ): Result;
    decodeFunctionResult(
      functionFragment: "getPrincipalLock",
      data: BytesLike
    ): Result;
    decodeFunctionResult(
      functionFragment: "getUnlockTime",
      data: BytesLike
    ): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "refund", data: BytesLike): Result;
    decodeFunctionResult(
      functionFragment: "renounceOwnership",
      data: BytesLike
    ): Result;
    decodeFunctionResult(functionFragment: "setRefund", data: BytesLike): Result;
    decodeFunctionResult(
      functionFragment: "transferOwnership",
      data: BytesLike
    ): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  
    events: {
      "GriefingLockCreated(address,address,address,uint256,uint256)": EventFragment;
      "GriefingTokensLocked(address,address,address,uint256,uint256)": EventFragment;
      "GriefingTokensRefunded(address,address,uint256)": EventFragment;
      "GriefingTokensWithdrawn(address,address,uint256)": EventFragment;
      "OwnershipTransferred(address,address)": EventFragment;
      "PrincipalDeployed(address,address,uint256,uint256)": EventFragment;
    };
  
    getEvent(nameOrSignatureOrTopic: "GriefingLockCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GriefingTokensLocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GriefingTokensRefunded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GriefingTokensWithdrawn"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PrincipalDeployed"): EventFragment;
  }
  
  export interface GriefingLockCreatedEventObject {
    tokenAddress: string;
    sender: string;
    receiver: string;
    amount: BigNumber;
    unlockTime: BigNumber;
  }
  export type GriefingLockCreatedEvent = TypedEvent<
    [string, string, string, BigNumber, BigNumber],
    GriefingLockCreatedEventObject
  >;
  
  export type GriefingLockCreatedEventFilter =
    TypedEventFilter<GriefingLockCreatedEvent>;
  
  export interface GriefingTokensLockedEventObject {
    tokenAddress: string;
    sender: string;
    receiver: string;
    amount: BigNumber;
    unlockTime: BigNumber;
  }
  export type GriefingTokensLockedEvent = TypedEvent<
    [string, string, string, BigNumber, BigNumber],
    GriefingTokensLockedEventObject
  >;
  
  export type GriefingTokensLockedEventFilter =
    TypedEventFilter<GriefingTokensLockedEvent>;
  
  export interface GriefingTokensRefundedEventObject {
    tokenAddress: string;
    sender: string;
    amount: BigNumber;
  }
  export type GriefingTokensRefundedEvent = TypedEvent<
    [string, string, BigNumber],
    GriefingTokensRefundedEventObject
  >;
  
  export type GriefingTokensRefundedEventFilter =
    TypedEventFilter<GriefingTokensRefundedEvent>;
  
  export interface GriefingTokensWithdrawnEventObject {
    tokenAddress: string;
    receiver: string;
    amount: BigNumber;
  }
  export type GriefingTokensWithdrawnEvent = TypedEvent<
    [string, string, BigNumber],
    GriefingTokensWithdrawnEventObject
  >;
  
  export type GriefingTokensWithdrawnEventFilter =
    TypedEventFilter<GriefingTokensWithdrawnEvent>;
  
  export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
  }
  export type OwnershipTransferredEvent = TypedEvent<
    [string, string],
    OwnershipTransferredEventObject
  >;
  
  export type OwnershipTransferredEventFilter =
    TypedEventFilter<OwnershipTransferredEvent>;
  
  export interface PrincipalDeployedEventObject {
    principalAddress: string;
    tokenAddress: string;
    amount: BigNumber;
    unlockTime: BigNumber;
  }
  export type PrincipalDeployedEvent = TypedEvent<
    [string, string, BigNumber, BigNumber],
    PrincipalDeployedEventObject
  >;
  
  export type PrincipalDeployedEventFilter =
    TypedEventFilter<PrincipalDeployedEvent>;
  
  export interface GriefingLock extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
  
    interface: GriefingLockInterface;
  
    queryFilter<TEvent extends TypedEvent>(
      event: TypedEventFilter<TEvent>,
      fromBlockOrBlockhash?: string | number | undefined,
      toBlock?: string | number | undefined
    ): Promise<Array<TEvent>>;
  
    listeners<TEvent extends TypedEvent>(
      eventFilter?: TypedEventFilter<TEvent>
    ): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(
      eventFilter: TypedEventFilter<TEvent>
    ): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
  
    functions: {
      changeTimeGap(
        newTimeGap: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      deployPrincipal(
        tokenAmount: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      depositGriefingTokens(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      getPrincipalLock(overrides?: CallOverrides): Promise<[string]>;
  
      getUnlockTime(overrides?: CallOverrides): Promise<[BigNumber]>;
  
      owner(overrides?: CallOverrides): Promise<[string]>;
  
      refund(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      setRefund(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      withdraw(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
    };
  
    changeTimeGap(
      newTimeGap: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    deployPrincipal(
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    depositGriefingTokens(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    getPrincipalLock(overrides?: CallOverrides): Promise<string>;
  
    getUnlockTime(overrides?: CallOverrides): Promise<BigNumber>;
  
    owner(overrides?: CallOverrides): Promise<string>;
  
    refund(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    setRefund(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    callStatic: {
      changeTimeGap(
        newTimeGap: PromiseOrValue<BigNumberish>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      deployPrincipal(
        tokenAmount: PromiseOrValue<BigNumberish>,
        overrides?: CallOverrides
      ): Promise<string>;
  
      depositGriefingTokens(overrides?: CallOverrides): Promise<void>;
  
      getPrincipalLock(overrides?: CallOverrides): Promise<string>;
  
      getUnlockTime(overrides?: CallOverrides): Promise<BigNumber>;
  
      owner(overrides?: CallOverrides): Promise<string>;
  
      refund(overrides?: CallOverrides): Promise<boolean>;
  
      renounceOwnership(overrides?: CallOverrides): Promise<void>;
  
      setRefund(overrides?: CallOverrides): Promise<void>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      withdraw(overrides?: CallOverrides): Promise<boolean>;
    };
  
    filters: {
      "GriefingLockCreated(address,address,address,uint256,uint256)"(
        tokenAddress?: PromiseOrValue<string> | null,
        sender?: PromiseOrValue<string> | null,
        receiver?: PromiseOrValue<string> | null,
        amount?: null,
        unlockTime?: null
      ): GriefingLockCreatedEventFilter;
      GriefingLockCreated(
        tokenAddress?: PromiseOrValue<string> | null,
        sender?: PromiseOrValue<string> | null,
        receiver?: PromiseOrValue<string> | null,
        amount?: null,
        unlockTime?: null
      ): GriefingLockCreatedEventFilter;
  
      "GriefingTokensLocked(address,address,address,uint256,uint256)"(
        tokenAddress?: PromiseOrValue<string> | null,
        sender?: PromiseOrValue<string> | null,
        receiver?: PromiseOrValue<string> | null,
        amount?: null,
        unlockTime?: null
      ): GriefingTokensLockedEventFilter;
      GriefingTokensLocked(
        tokenAddress?: PromiseOrValue<string> | null,
        sender?: PromiseOrValue<string> | null,
        receiver?: PromiseOrValue<string> | null,
        amount?: null,
        unlockTime?: null
      ): GriefingTokensLockedEventFilter;
  
      "GriefingTokensRefunded(address,address,uint256)"(
        tokenAddress?: PromiseOrValue<string> | null,
        sender?: PromiseOrValue<string> | null,
        amount?: null
      ): GriefingTokensRefundedEventFilter;
      GriefingTokensRefunded(
        tokenAddress?: PromiseOrValue<string> | null,
        sender?: PromiseOrValue<string> | null,
        amount?: null
      ): GriefingTokensRefundedEventFilter;
  
      "GriefingTokensWithdrawn(address,address,uint256)"(
        tokenAddress?: PromiseOrValue<string> | null,
        receiver?: PromiseOrValue<string> | null,
        amount?: null
      ): GriefingTokensWithdrawnEventFilter;
      GriefingTokensWithdrawn(
        tokenAddress?: PromiseOrValue<string> | null,
        receiver?: PromiseOrValue<string> | null,
        amount?: null
      ): GriefingTokensWithdrawnEventFilter;
  
      "OwnershipTransferred(address,address)"(
        previousOwner?: PromiseOrValue<string> | null,
        newOwner?: PromiseOrValue<string> | null
      ): OwnershipTransferredEventFilter;
      OwnershipTransferred(
        previousOwner?: PromiseOrValue<string> | null,
        newOwner?: PromiseOrValue<string> | null
      ): OwnershipTransferredEventFilter;
  
      "PrincipalDeployed(address,address,uint256,uint256)"(
        principalAddress?: PromiseOrValue<string> | null,
        tokenAddress?: PromiseOrValue<string> | null,
        amount?: null,
        unlockTime?: null
      ): PrincipalDeployedEventFilter;
      PrincipalDeployed(
        principalAddress?: PromiseOrValue<string> | null,
        tokenAddress?: PromiseOrValue<string> | null,
        amount?: null,
        unlockTime?: null
      ): PrincipalDeployedEventFilter;
    };
  
    estimateGas: {
      changeTimeGap(
        newTimeGap: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      deployPrincipal(
        tokenAmount: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      depositGriefingTokens(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      getPrincipalLock(overrides?: CallOverrides): Promise<BigNumber>;
  
      getUnlockTime(overrides?: CallOverrides): Promise<BigNumber>;
  
      owner(overrides?: CallOverrides): Promise<BigNumber>;
  
      refund(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      setRefund(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      withdraw(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
    };
  
    populateTransaction: {
      changeTimeGap(
        newTimeGap: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      deployPrincipal(
        tokenAmount: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      depositGriefingTokens(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      getPrincipalLock(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      getUnlockTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      refund(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      setRefund(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      withdraw(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
    };
  }
  