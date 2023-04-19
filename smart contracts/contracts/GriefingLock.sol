// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./NT.sol";
import "./PrincipalLock.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GriefingLock is Ownable {
    uint constant MIN_TIME_GAP = 180;
    NewToken private _tokenAddress;
    address private _pLockAddress = address(0);
    address private _sender;
    address private _receiver;
    uint private _tokenAmount;
    uint private _timeGap;
    uint private _unlockTime;
    bool private _withdrawn = false;
    bool private _refunded = false;
    bool private _deployed = false;
    
    event GriefingTokensLocked(address indexed tokenAddress, address indexed sender, address indexed receiver, uint256 amount, uint256 unlockTime);
    event GriefingTokensWithdrawn(address indexed tokenAddress, address indexed receiver, uint256 amount);
    event PrincipalDeployed(address indexed principalAddress, address indexed tokenAddress, uint256 amount, uint256 unlockTime);
    event GriefingTokensRefunded(address indexed tokenAddress, address indexed sender, uint256 amount);

    constructor (address tokenAddress, address receiver, uint tokenAmount, uint timeGap)
        positiveTokenCollateral(tokenAmount)
        validUnlockTime(timeGap)
    {
        _tokenAddress = NewToken(tokenAddress);
        _sender = owner();
        _receiver = receiver;
        _tokenAmount = tokenAmount;
        _timeGap = timeGap;
        _unlockTime = SafeMath.add(block.timestamp, _timeGap);
        _tokenAddress.transferFrom(_sender, address(this), _tokenAmount);
        emit GriefingTokensLocked(address(_tokenAddress), _sender, _receiver, _tokenAmount, _unlockTime);
    }

    modifier positiveTokenCollateral(uint tokenAmount) {
        require(tokenAmount > 0, "Token: Send a positive amount of token");
        _;
    }

    modifier validUnlockTime(uint timeGap) {
        require(timeGap >= MIN_TIME_GAP, string(abi.encodePacked("Time: Unlock Time must be at least ", Strings.toString(MIN_TIME_GAP), " seconds later")));
        _;
    }

    modifier withdrawable() {
        require(
            _receiver == msg.sender, 
            "Withdrawal: Not Stipulated Receiver"
        );
        require(
            _withdrawn == false,
            "Withdrawal: Already Withdrawn"
        );
        require(
            _deployed = false,
            "Withdrawal: Principal Lock has been deployed. Do claim your funds immediately"
        );
        require(
            _unlockTime < block.timestamp,
            "Withdrawal: Unlock Time has yet to pass and you may not withdraw the funds"
        );
        _;
    }

    modifier refundable() {
        require(
            _sender == msg.sender, 
            "Refund: Not Sender, please check if you are using the correct account"
        );
        require(
            _refunded == false, 
            "Refund: Already Refunded"
        );
        require(
            _withdrawn == false, 
            "Refund: You may not refund as a withdrawal has been processed"
        );
        require(
            _unlockTime < block.timestamp, 
            "Refund: Please wait for timelock to pass"
        );
        _;
    }

    function deployPrincipal(uint tokenAmount) external onlyOwner returns(PrincipalLock) {
        PrincipalLock principalContract = new PrincipalLock(address(this), address(_tokenAddress), _sender, _receiver, tokenAmount, SafeMath.add(_unlockTime, _timeGap));
        _pLockAddress = address(principalContract);
        _deployed = true;
        emit PrincipalDeployed(address(principalContract), address(_tokenAddress), tokenAmount, SafeMath.add(_unlockTime, _timeGap));
        return principalContract;
    }

    function withdraw() public withdrawable returns (bool) {
        _tokenAddress.transfer(_receiver, _tokenAmount);
        _withdrawn = true;
        emit GriefingTokensWithdrawn(address(_tokenAddress), _receiver, _tokenAmount);
        return true;
    }

    function refund() public refundable onlyOwner returns (bool) {
        _tokenAddress.transfer(_sender, _tokenAmount);
        _refunded = true;
        emit GriefingTokensRefunded(address(_tokenAddress), _sender, _tokenAmount);
        return true;
    }

    /**
        @dev
        We prevent Bob from changing the time after deploying the Principal Lock to prevent malicious actions
        We use _pLockAddress instead of _deployed as _deployed will be set to false to allow Alice to withdraw Bob's Griefing Sum if Bob griefs
    */

    function changeTimeGap(uint newTimeGap) public onlyOwner validUnlockTime(newTimeGap) {
        require(address(_pLockAddress) == address(0), "Time Gap Change: You have already deployed the Principal Lock and you cannot change the Time Gap");
        _timeGap = newTimeGap;
    }

    /** 
        @dev
        When Bob refunds the Principal Sum, this function is called by Principal Lock
        This sets _refunded to true, to prevent Bob from refunding his Principal Sum
        This sets _deployed to false, to allow Alice to withdraw Bob's Griefing Sum
    */
    function setRefund() public {
        require(address(_pLockAddress) == msg.sender, "Principal Lock Refund Setting: Unauthorized Access");
        _refunded = true;
        _deployed = false;
    }
}