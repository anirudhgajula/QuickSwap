const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const { expect } = require("chai");

describe('NewToken', function() {
  async function deployFixture() {
    [adminUser, userOne, userTwo] = await ethers.getSigners();
    const factory = await ethers.getContractFactory('NewToken', adminUser);
    genericToken = (await factory.deploy(
      'NewToken',
      'NT'
    ))
    initialSupply = BigNumber.from(1000000).mul(BigNumber.from(10).pow(18));
    return { adminUser, userOne, userTwo, genericToken, initialSupply };
  };

  it('has a name', async () => {
    const { genericToken } = await loadFixture(deployFixture);
    expect(await genericToken.name()).to.equal('NewToken');
  });

  it('has a symbol', async () => {
    const { genericToken } = await loadFixture(deployFixture);
    expect(await genericToken.symbol()).to.equal('NT');
  });

  it('has 18 decimals', async () => {
    const { genericToken } = await loadFixture(deployFixture);
    expect(await genericToken.decimals()).to.equal(18);
  });

  it('returns the total amount of tokens', async () => {
    const { genericToken } = await loadFixture(deployFixture);
    expect(await genericToken.totalSupply()).to.equal(initialSupply);
  });

  it('can be paused', async () => {
    const { genericToken } = await loadFixture(deployFixture);
    expect(await genericToken.pause()).to.emit(genericToken, 'Paused');
  });

  it('cannot be paused twice', async () => {
    const { genericToken } = await loadFixture(deployFixture);
    await genericToken.pause();
    await expect(genericToken.pause()).to.be.reverted;
  });

  it('can be unpaused', async () => {
    const { genericToken } = await loadFixture(deployFixture);
    await genericToken.pause();
    expect(await genericToken.unpause()).to.emit(genericToken, 'Unpaused');
  });

  it('can mint tokens', async () => {
    const { userOne, genericToken } = await loadFixture(deployFixture);
    await genericToken.mint(userOne.address, 1000);
    expect(await genericToken.balanceOf(userOne.address)).to.equal(1000);
  });

  it('can burn tokens', async () => {
    const { genericToken } = await loadFixture(deployFixture);
    await genericToken.burn(initialSupply);
    expect(await genericToken.balanceOf(adminUser.address)).to.equal(0);
  });

  it('when the requested account has no tokens, it returns zero', async () => {
    const { userOne, genericToken } = await loadFixture(deployFixture);
    expect(await genericToken.balanceOf(userOne.address)).to.equal(0);
  });

  it('when the requested account has some tokens, returns the total amount of tokens', async () => {
    const { adminUser, genericToken } = await loadFixture(deployFixture);
    expect(await genericToken.balanceOf(adminUser.address)).to.equal(initialSupply);
  });

  it('when the sender does not have enough balance, it reverts', async () => {
    const { userOne, genericToken } = await loadFixture(deployFixture);
    await expect(genericToken.transfer(userOne.address, initialSupply.add(1))).to.be.revertedWith(
      'ERC20: transfer amount exceeds balance'
    );
  });

  it('transfers the requested amount', async () => {
    const { adminUser, userOne, genericToken } = await loadFixture(deployFixture);
    await genericToken.transfer(userOne.address, initialSupply);
    expect(await genericToken.balanceOf(adminUser.address)).to.equal(0);
    expect(await genericToken.balanceOf(userOne.address)).to.equal(initialSupply);
  });

  it('emits a transfer event', async () => {
    const { adminUser, userOne, genericToken } = await loadFixture(deployFixture);
    await expect(genericToken.transfer(userOne.address, initialSupply))
      .to.emit(genericToken, 'Transfer')
      .withArgs(adminUser.address, userOne.address, initialSupply);
  });

  it('when the spender has enough approved balance, transfers the requested amount', async () => {
    const { adminUser, userOne, userTwo, genericToken } = await loadFixture(deployFixture);
    await expect(genericToken.approve(userOne.address, initialSupply))
      .to.emit(genericToken, 'Approval')
      .withArgs(adminUser.address, userOne.address, initialSupply);
    await expect(genericToken.connect(userOne).transferFrom(adminUser.address, userTwo.address, initialSupply))
      .to.emit(genericToken, 'Transfer')
      .withArgs(adminUser.address, userTwo.address, initialSupply);
    expect(await genericToken.balanceOf(adminUser.address)).to.equal(0);
    expect(await genericToken.balanceOf(userTwo.address)).to.equal(initialSupply);
    expect(await genericToken.allowance(adminUser.address, userOne.address)).to.equal(0);
  });

  it('when the token owner does not have enough balance, it reverts', async () => {
    const { adminUser, userOne, userTwo, genericToken } = await loadFixture(deployFixture);
    await expect(genericToken.approve(userOne.address, initialSupply.add(1)))
      .to.emit(genericToken, 'Approval')
      .withArgs(adminUser.address, userOne.address, initialSupply.add(1));
    await expect(
      genericToken.connect(userOne).transferFrom(adminUser.address, userTwo.address, initialSupply.add(1))
    ).to.be.revertedWith('ERC20: transfer amount exceeds balance');
  });

  it('when the spender does not have enough approved balance, it reverts', async () => {
    const { adminUser, userOne, userTwo, genericToken } = await loadFixture(deployFixture);
    await expect(genericToken.approve(userOne.address, initialSupply.sub(1)))
      .to.emit(genericToken, 'Approval')
      .withArgs(adminUser.address, userOne.address, initialSupply.sub(1));
    await expect(
      genericToken.connect(userOne).transferFrom(adminUser.address, userTwo.address, initialSupply)
    ).to.be.revertedWith('ERC20: insufficient allowance');
  });

  it('when the token owner does not have enough balance, it reverts', async () => {
    const { adminUser, userOne, userTwo, genericToken } = await loadFixture(deployFixture);
    await expect(genericToken.approve(userOne.address, initialSupply.add(1)))
      .to.emit(genericToken, 'Approval')
      .withArgs(adminUser.address, userOne.address, initialSupply.add(1));
    await expect(
      genericToken.connect(userOne).transferFrom(adminUser.address, userTwo.address, initialSupply.add(1))
    ).to.be.revertedWith('ERC20: transfer amount exceeds balance');
  });
});