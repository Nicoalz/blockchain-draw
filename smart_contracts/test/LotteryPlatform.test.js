/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-require-imports */

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('LotteryPlatform', function () {
  let LotteryPlatform;
  let lotteryPlatform;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    LotteryPlatform = await ethers.getContractFactory('LotteryPlatform');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new LotteryPlatform contract before each test
    lotteryPlatform = await LotteryPlatform.deploy();
    await lotteryPlatform.waitForDeployment();
  });

  describe('Lottery Creation', function () {
    it('Should create a new lottery with correct initial values', async function () {
      await lotteryPlatform.createLottery('');
      const lottery = await lotteryPlatform.lotteries(1);

      expect(lottery.id).to.equal(1);
      expect(lottery.creator).to.equal(owner.address);
      expect(lottery.isActive).to.be.true;
      expect(lottery.winningTicketId).to.equal(0);
    });

    it('Should emit LotteryCreated event', async function () {
      await expect(lotteryPlatform.createLottery(''))
        .to.emit(lotteryPlatform, 'LotteryCreated')
        .withArgs(1, owner.address);
    });

    it('Should increment lottery counter', async function () {
      await lotteryPlatform.createLottery('');
      expect(await lotteryPlatform.lotteryCounter()).to.equal(1);
    });

    it('Should returns active lotteries', async function () {
      await lotteryPlatform.createLottery('');
      await lotteryPlatform.createLottery('');
      await lotteryPlatform.createLottery('');
      await lotteryPlatform.buyTicket(1);
      const activeLotteries = await lotteryPlatform.getActiveLotteries();
      expect(activeLotteries.length).to.equal(3); // 3 + 1 (deployed one) - 1 (inactive)
    });
  });

  describe('Ticket Purchase', function () {
    let lotteryId;

    beforeEach(async function () {
      await lotteryPlatform.createLottery('');
      lotteryId = await lotteryPlatform.lotteryCounter();
    });

    it('Should allow buying a ticket for an active lottery', async function () {
      await lotteryPlatform.connect(addr1).buyTicket(lotteryId);
      const userTickets = await lotteryPlatform.getTicketsOf(addr1.address);
      expect(userTickets.length).to.equal(1);
    });

    it('Should emit TicketCreated event', async function () {
      await expect(lotteryPlatform.connect(addr1).buyTicket(lotteryId))
        .to.emit(lotteryPlatform, 'TicketCreated')
        .withArgs(lotteryId, 1, addr1.address);
    });

    it('Should not allow buying ticket for inactive lottery', async function () {
      await lotteryPlatform.buyTicket(lotteryId);
      await lotteryPlatform.drawWinner(lotteryId);
      await expect(
        lotteryPlatform.connect(addr1).buyTicket(lotteryId),
      ).to.be.revertedWith('Lottery is not active.');
    });

    it('Should not allow buying 2 tickets for the same lottery', async function () {
      await lotteryPlatform.connect(addr1).buyTicket(lotteryId);
      await expect(
        lotteryPlatform.connect(addr1).buyTicket(lotteryId),
      ).to.be.revertedWith('Already bought a ticket.');
    });
  });

  describe('Drawing Winner', function () {
    let lotteryId;

    beforeEach(async function () {
      await lotteryPlatform.createLottery('');
      lotteryId = await lotteryPlatform.lotteryCounter();
      await lotteryPlatform.connect(addr1).buyTicket(lotteryId);
      await lotteryPlatform.connect(addr2).buyTicket(lotteryId);
    });

    it('Should allow creator to draw winner', async function () {
      await lotteryPlatform.drawWinner(lotteryId);
      const lottery = await lotteryPlatform.lotteries(lotteryId);
      expect(lottery.isActive).to.be.false;
      expect(lottery.winningTicketId).to.be.gt(0);
    });

    it('Should emit LotteryDrawn event', async function () {
      await expect(lotteryPlatform.drawWinner(lotteryId)).to.emit(
        lotteryPlatform,
        'LotteryDrawn',
      );
    });

    it('Should not allow non-creator to draw winner', async function () {
      await expect(
        lotteryPlatform.connect(addr1).drawWinner(lotteryId),
      ).to.be.revertedWith('Only creator can draw.');
    });

    it('Should not allow drawing winner twice', async function () {
      await lotteryPlatform.drawWinner(lotteryId);
      await expect(lotteryPlatform.drawWinner(lotteryId)).to.be.revertedWith(
        'Draw already done.',
      );
    });

    it('Should not allow drawing winner with no tickets', async function () {
      await lotteryPlatform.createLottery('');
      const emptyLotteryId = await lotteryPlatform.lotteryCounter();
      await expect(
        lotteryPlatform.drawWinner(emptyLotteryId),
      ).to.be.revertedWith('No ticket created.');
    });
  });

  describe('User Tickets and Lotteries', function () {
    let lotteryId;

    beforeEach(async function () {
      await lotteryPlatform.createLottery('');
      lotteryId = await lotteryPlatform.lotteryCounter();
      await lotteryPlatform.connect(addr1).buyTicket(lotteryId);
    });

    it('Should correctly be a winning ticket', async function () {
      await lotteryPlatform.drawWinner(lotteryId);
      const userTickets = await lotteryPlatform.getTicketsOf(addr1.address);
      expect(userTickets[0].isWinning).to.be.true;
      const lottery = await lotteryPlatform.lotteries(lotteryId);
      expect(lottery.winningTicketId).to.equal(userTickets[0].id);
    });

    it('Should correctly return user tickets and lotteries', async function () {
      const userTickets = await lotteryPlatform.getTicketsOf(addr1.address);
      const userLotteries = await lotteryPlatform.getLotteriesOf(addr1.address);
      expect(userTickets.length).to.equal(1);
      expect(userLotteries.length).to.equal(1);
      expect(userTickets[0].owner).to.equal(addr1.address);
      // creator of lottery check is  not mandatory as we check if it s there not the creator
    });

    it('User 2 should be in one lottery', async function () {
      await lotteryPlatform.connect(addr2).buyTicket(lotteryId);
      const userTickets = await lotteryPlatform.getTicketsOf(addr2.address);
      const userLotteries = await lotteryPlatform.getLotteriesOf(addr2.address);
      expect(userTickets.length).to.equal(1);
      expect(userLotteries.length).to.equal(1);
    });
  });

  describe('Active Lotteries By Creator', function () {
    let firstLotteryId;
    let secondLotteryId;

    beforeEach(async function () {
      await lotteryPlatform.createLottery('');
      firstLotteryId = await lotteryPlatform.lotteryCounter();
      await lotteryPlatform.createLottery('');
      secondLotteryId = await lotteryPlatform.lotteryCounter();
    });

    it('Should return active lotteries for creator', async function () {
      const myCreatedActiveLotteries =
        await lotteryPlatform.getDrawableLotteries(owner.address);
      expect(myCreatedActiveLotteries.length).to.equal(2);
      expect(myCreatedActiveLotteries[0].id).to.equal(firstLotteryId);
      expect(myCreatedActiveLotteries[1].id).to.equal(secondLotteryId);
    });

    it('Should not include inactive lotteries', async function () {
      await lotteryPlatform.buyTicket(firstLotteryId);
      await lotteryPlatform.drawWinner(firstLotteryId);
      const myCreatedActiveLotteries =
        await lotteryPlatform.getDrawableLotteries(owner.address);

      expect(myCreatedActiveLotteries.length).to.equal(1);
      expect(myCreatedActiveLotteries[0].id).to.equal(secondLotteryId);
    });
  });
});
