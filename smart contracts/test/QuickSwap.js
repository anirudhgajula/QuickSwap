const { loadFixture, time } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe('QuickSwap', function () {
    async function deployFixture() {
        [userOne, userTwo, userThree] = await ethers.getSigners();
        const SwapFactory = await ethers.getContractFactory('GriefingLock', userOne);
        
        griefingLock = (await SwapFactory.deploy(
            userTwo.address,
            200
        ));
        
        await expect(griefingLock.connect(userOne).depositGriefingTokens({value: 2000})).to.changeEtherBalance(griefingLock.address, 2000);
            
        return { userOne, userTwo, userThree, griefingLock };
    };

    it('QuickSwap Proceeds - Protocol under right conditions', async () => {
        const { userOne, userTwo, griefingLock } = await loadFixture(deployFixture);
        await time.increase(100);

        await griefingLock.connect(userOne).deployPrincipal(
        {value: 10000}
        );

        const pLockAddress = await griefingLock.connect(userTwo).getPrincipalLock();
        principalLock = (await ethers.getContractAt('PrincipalLock', pLockAddress));

        expect(await ethers.provider.getBalance(pLockAddress))
        .to.equal(10000);

        await expect(principalLock.connect(userTwo).withdraw())
        .to.emit(principalLock, 'PrincipalWithdrawn')
        .withArgs(userTwo.address, 10000);

        expect(await ethers.provider.getBalance(pLockAddress))
        .to.equal(0);

        expect(await ethers.provider.getBalance(griefingLock.address))
        .to.equal(2000);

        await time.increase(100);

        await expect(griefingLock.connect(userOne).refund())
        .to.emit(griefingLock, 'GriefingRefunded')
        .withArgs(userOne.address, 2000);

        expect(await ethers.provider.getBalance(griefingLock.address))
        .to.equal(0);
    });

    it('QuickSwap Reverts - User Two Fails to Deploy Griefing Lock and Principal Lock on Other Network', async () => {
        const { userOne, griefingLock } = await loadFixture(deployFixture);
        await time.increase(200);
        await expect(griefingLock.connect(userOne).refund())
        .to.emit(griefingLock, 'GriefingRefunded')
        .withArgs(userOne.address, 2000);
    });

    it('QuickSwap Reverts - User One backs off after User Two Deploys Griefing Lock and Principal Lock', async () => {
        const { userTwo, griefingLock } = await loadFixture(deployFixture);
        await time.increase(200);
        await expect(griefingLock.connect(userTwo).withdraw())
        .to.emit(griefingLock, 'GriefingWithdrawn')
        .withArgs(userTwo.address, 2000);
    });

    it('QuickSwap Reverts - User One tries to refund early', async () => {
        const { userOne, griefingLock } = await loadFixture(deployFixture);
        await time.increase(100);
        await expect(griefingLock.connect(userOne).refund()).to.be.revertedWith('Refund: Please wait for timelock to pass');
    });

    it('QuickSwap Reverts - User Two tries to withdraw early', async () => {
        const { userOne, userTwo, griefingLock } = await loadFixture(deployFixture);

        await time.increase(100);
        await expect(griefingLock.connect(userTwo).withdraw()).to.be.revertedWith(
        'Withdrawal: Unlock Time has yet to pass'
        );

        await griefingLock.connect(userOne).deployPrincipal(
        {value: 10000}
        );

        const pLockAddress = await griefingLock.connect(userTwo).getPrincipalLock();
        principalLock = (await ethers.getContractAt('PrincipalLock', pLockAddress));

        await expect(griefingLock.connect(userTwo).withdraw()).to.be.revertedWith(
        'Withdrawal: Principal Lock is deployed. Claim your funds'
        );
    });

    it('QuickSwap Reverts - Unauthorized User Attempts to Withdraw/Refund', async () => {
        const { userThree, griefingLock } = await loadFixture(deployFixture);

        await time.increase(100);
        await expect(griefingLock.connect(userThree).withdraw()).to.be.revertedWith('Withdrawal: Not Stipulated Receiver');
        await expect(griefingLock.connect(userThree).refund()).to.be.revertedWith(
        'Refund: Not Sender, please use the correct account'
        );
    });
});