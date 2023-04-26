const { loadFixture, time } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const { expect } = require("chai");

describe('QuickSwap Tokens', function () {
    async function deployFixture() {
        [adminUser, userOne, userTwo] = await ethers.getSigners();
        const tokenFactory = await ethers.getContractFactory('NewToken', adminUser);
        genericToken = (await tokenFactory.deploy(
            'NewToken',
            'NT'
        ));

        initialSupply = BigNumber.from(1000000).mul(BigNumber.from(10).pow(18));

        await expect(genericToken.approve(adminUser.address, BigNumber.from(11000).mul(BigNumber.from(10).pow(18))))
            .to.emit(genericToken, 'Approval')
            .withArgs(adminUser.address, adminUser.address, BigNumber.from(11000).mul(BigNumber.from(10).pow(18))
        );

        await expect(genericToken.connect(adminUser)
            .transferFrom(adminUser.address, userOne.address, BigNumber.from(11000).mul(BigNumber.from(10).pow(18))))
            .to.emit(genericToken, 'Transfer')
            .withArgs(adminUser.address, userOne.address, BigNumber.from(11000).mul(BigNumber.from(10).pow(18))
        );

        await expect(genericToken.approve(adminUser.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18))))
            .to.emit(genericToken, 'Approval')
            .withArgs(adminUser.address, adminUser.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
        );
      
        await expect(genericToken.connect(adminUser)
            .transferFrom(adminUser.address, userTwo.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18))))
            .to.emit(genericToken, 'Transfer')
            .withArgs(adminUser.address, userTwo.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
        );
      
        expect(await genericToken.balanceOf(userOne.address)).to.equal(
            BigNumber.from(11000).mul(BigNumber.from(10).pow(18))
        );

        expect(await genericToken.balanceOf(userTwo.address)).to.equal(
            BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
        );

        expect(await genericToken.balanceOf(adminUser.address)).to.equal(
            BigNumber.from(988000).mul(BigNumber.from(10).pow(18))
        );
        
        const SwapFactory = await ethers.getContractFactory('GriefingLockToken', userOne);

        griefingLock = (await SwapFactory.deploy(
            genericToken.address,
            userTwo.address,
            BigNumber.from(1000).mul(BigNumber.from(10).pow(18)),
            200
        ));

        const unlockTime = await griefingLock.connect(userOne).getUnlockTime();

        await expect(genericToken.connect(userOne)
            .approve(griefingLock.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18))))
            .to.emit(genericToken, 'Approval')
            .withArgs(userOne.address, griefingLock.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
        );

        await expect(griefingLock.connect(userOne).depositGriefingTokens())
            .to.emit(griefingLock, 'GriefingTokensLocked')
            .withArgs(
                genericToken.address,
                userOne.address,
                userTwo.address,
                BigNumber.from(1000).mul(BigNumber.from(10).pow(18)),
                unlockTime
        );

        return { adminUser, userOne, userTwo, genericToken, initialSupply, unlockTime, griefingLock };
    };
    
    it('Token balances are correct before Quick Swap Protocol', async () => {
        const { adminUser, userOne, userTwo, genericToken } = await loadFixture(deployFixture);
        expect(await genericToken.balanceOf(userOne.address)).to.equal(
        BigNumber.from(10000).mul(BigNumber.from(10).pow(18))
        );
        expect(await genericToken.balanceOf(userTwo.address)).to.equal(
        BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
        );
        expect(await genericToken.balanceOf(adminUser.address)).to.equal(
        BigNumber.from(988000).mul(BigNumber.from(10).pow(18))
        );
    });

  it('QuickSwap Proceeds - Protocol under right conditions', async () => {
    const { userOne, userTwo, genericToken, griefingLock } = await loadFixture(deployFixture);
    await time.increase(100);
    await expect(
      genericToken.connect(userOne).approve(griefingLock.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)))
    )
      .to.emit(genericToken, 'Approval')
      .withArgs(userOne.address, griefingLock.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    await griefingLock.connect(userOne).deployPrincipal(BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    const pLockAddress = await griefingLock.connect(userTwo).getPrincipalLock();
    principalLock = (await ethers.getContractAt('PrincipalLockToken', pLockAddress));

    await expect(principalLock.connect(userTwo).withdraw())
      .to.emit(principalLock, 'PrincipalTokensWithdrawn')
      .withArgs(genericToken.address, userTwo.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    await time.increase(100);

    await expect(griefingLock.connect(userOne).refund())
      .to.emit(griefingLock, 'GriefingTokensRefunded')
      .withArgs(genericToken.address, userOne.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18)));
  });

  it('QuickSwap Reverts - User Two Fails to Deploy Griefing Lock and Principal Lock on Other Network', async () => {
    const { userOne, genericToken, griefingLock } = await loadFixture(deployFixture);
    await time.increase(200);
    await expect(griefingLock.connect(userOne).refund())
      .to.emit(griefingLock, 'GriefingTokensRefunded')
      .withArgs(genericToken.address, userOne.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18)));
  });

  it('QuickSwap Reverts - User One backs off after User Two Deploys Griefing Lock and Principal Lock', async () => {
    const { userTwo, genericToken, griefingLock } = await loadFixture(deployFixture);
    await time.increase(200);
    await expect(griefingLock.connect(userTwo).withdraw())
      .to.emit(griefingLock, 'GriefingTokensWithdrawn')
      .withArgs(genericToken.address, userTwo.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18)));
  });

  it('QuickSwap Reverts - User One tries to refund early', async () => {
    const { userOne, griefingLock } = await loadFixture(deployFixture);

    await time.increase(100);
    await expect(griefingLock.connect(userOne).refund()).to.be.revertedWith('Refund: Please wait for timelock to pass');
  });

  it('QuickSwap Reverts - User Two tries to withdraw early', async () => {
    const { userOne, userTwo, genericToken, griefingLock } = await loadFixture(deployFixture);
    await time.increase(100);
    await expect(griefingLock.connect(userTwo).withdraw()).to.be.revertedWith(
      'Withdrawal: Unlock Time has yet to pass'
    );

    await expect(
      genericToken.connect(userOne).approve(griefingLock.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)))
    )
      .to.emit(genericToken, 'Approval')
      .withArgs(userOne.address, griefingLock.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    await griefingLock.connect(userOne).deployPrincipal(BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    const pLockAddress = await griefingLock.connect(userTwo).getPrincipalLock();
    principalLock = (await ethers.getContractAt('PrincipalLockToken', pLockAddress));

    await expect(griefingLock.connect(userTwo).withdraw()).to.be.revertedWith(
      'Withdrawal: Principal Lock is deployed. Claim your funds'
    );
  });

  it('QuickSwap Reverts - User One refunds and User Two withdraws Griefing Tokens', async () => {
    const { userOne, userTwo, genericToken, griefingLock } = await loadFixture(deployFixture);
    await time.increase(100);
    await expect(
      genericToken.connect(userOne).approve(griefingLock.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)))
    )
      .to.emit(genericToken, 'Approval')
      .withArgs(userOne.address, griefingLock.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    await griefingLock.connect(userOne).deployPrincipal(BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    const pLockAddress = await griefingLock.connect(userTwo).getPrincipalLock();
    principalLock = (await ethers.getContractAt('PrincipalLockToken', pLockAddress));


    await expect(principalLock.connect(userOne).refund())
      .to.emit(principalLock, 'PrincipalTokensRefunded')
      .withArgs(genericToken.address, userOne.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)))

    // When user User One refunds his Principal Tokens, the Principal Lock calls the Griefing Lock's setRefund method
    // so that User One cannot refund his Griefing Tokens, but User Two can withdraw the Griefing Tokens (this is done with the use of boolean vars _accessible and _refunded)

    await time.increase(100);

    await expect(griefingLock.connect(userTwo).withdraw())
      .to.emit(griefingLock, 'GriefingTokensWithdrawn')
      .withArgs(genericToken.address, userTwo.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18)));

    await expect(griefingLock.connect(userOne).refund())
      .to.be.revertedWith("Refund: Already Refunded");

  });

  it('QuickSwap setRefund Method Illustration - Only Principal Lock can call this method', async () => {
    const { userOne, userTwo, genericToken, griefingLock } = await loadFixture(deployFixture);
    await time.increase(100);
    await expect(
      genericToken.connect(userOne).approve(griefingLock.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)))
    )
      .to.emit(genericToken, 'Approval')
      .withArgs(userOne.address, griefingLock.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    await griefingLock.connect(userOne).deployPrincipal(BigNumber.from(10000).mul(BigNumber.from(10).pow(18)));

    const pLockAddress = await griefingLock.connect(userTwo).getPrincipalLock();
    principalLock = (await ethers.getContractAt('PrincipalLockToken', pLockAddress));

    // No one can access the griefingLock's setRefund() method other than principalLock when userOne refunds

    await expect(griefingLock.connect(userOne).setRefund())
      .to.be.revertedWith("Principal Lock Refund Setting: Unauthorized Access")

    await expect(griefingLock.connect(userTwo).setRefund())
      .to.be.revertedWith("Principal Lock Refund Setting: Unauthorized Access")

    await expect(griefingLock.connect(adminUser).setRefund())
      .to.be.revertedWith("Principal Lock Refund Setting: Unauthorized Access")

    await expect(principalLock.connect(userOne).refund())
      .to.emit(principalLock, 'PrincipalTokensRefunded')
      .withArgs(genericToken.address, userOne.address, BigNumber.from(10000).mul(BigNumber.from(10).pow(18)))

    // When user User One refunds his Principal Tokens, the Principal Lock calls the Griefing Lock's setRefund method
    // so that User One cannot refund his Griefing Tokens, but User Two can withdraw the Griefing Tokens (this is done with the use of boolean vars _accessible and _refunded)

    await time.increase(100);

    await expect(griefingLock.connect(userTwo).withdraw())
      .to.emit(griefingLock, 'GriefingTokensWithdrawn')
      .withArgs(genericToken.address, userTwo.address, BigNumber.from(1000).mul(BigNumber.from(10).pow(18)));

    await expect(griefingLock.connect(userOne).refund())
      .to.be.revertedWith("Refund: Already Refunded");
  });


  it('QuickSwap Reverts - Unauthorized User Attempts to Withdraw/Refund', async () => {
    const { adminUser, griefingLock } = await loadFixture(deployFixture);
    await time.increase(100);
    await expect(griefingLock.connect(adminUser).withdraw()).to.be.revertedWith('Withdrawal: Not Stipulated Receiver');
    await expect(griefingLock.connect(adminUser).refund()).to.be.revertedWith(
      'Refund: Not Sender, please use the correct account'
    );
  });
});
