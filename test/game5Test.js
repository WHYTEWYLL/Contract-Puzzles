const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();


    const signer = ethers.provider.getSigner(0);

    let wallet; 

    while(true){
      wallet = ethers.Wallet.createRandom();
      if(BigInt(wallet.address) < BigInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf") ) break;
    }
    
    wallet = wallet.connect(ethers.provider);

    signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("1")
    });
    // good luck

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
