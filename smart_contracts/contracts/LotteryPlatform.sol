// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract LotteryPlatform {
    struct Ticket {
        uint256 id;
        uint256 lotteryId;
        address owner;
        bool isWinning;
    }

    struct Lottery {
        uint256 id;
        string name;
        address creator;
        bool isActive;
        uint256 winningTicketId;
        Ticket[] tickets;
    }

    uint256 public lotteryCounter;
    uint256 public ticketCounter;
    mapping(uint256 => Lottery) public lotteries;
    mapping(uint256 => Ticket) public tickets;

    mapping(address => uint256[]) public userTickets;
    mapping(address => uint256[]) public userLotteries;

    event LotteryCreated(uint256 indexed lotteryId, address indexed creator);
    event TicketCreated(uint256 indexed lotteryId, uint256 indexed ticketId, address indexed owner);
    event LotteryDrawn(uint256 indexed lotteryId, uint256 indexed winningTicketId);

    function createLottery(string memory name) public {
        lotteryCounter++;
        uint256 lotteryId = lotteryCounter;
        
        // Initialize the lottery directly in storage
        Lottery storage newLottery = lotteries[lotteryId];
        newLottery.id = lotteryId;
        newLottery.creator = msg.sender;
        newLottery.isActive = true;
        newLottery.winningTicketId = 0;
        newLottery.name = name;
        // The tickets array is automatically initialized as empty
        
        userLotteries[msg.sender].push(lotteryId);
        emit LotteryCreated(lotteryId, msg.sender);
    }

    function buyTicket(uint256 lotteryId) public {
        Lottery storage lottery = lotteries[lotteryId];
        require(lottery.isActive, "Lottery is not active.");

        for (uint256 i = 0; i < lottery.tickets.length; i++) {
            require(lottery.tickets[i].owner != msg.sender, "Already bought a ticket.");
        }

        ticketCounter++;
        uint256 ticketId = ticketCounter;

        Ticket memory newTicket = Ticket({
            id: ticketId,
            lotteryId: lotteryId,
            owner: msg.sender,
            isWinning: false
        });

        tickets[ticketId] = newTicket;

        lottery.tickets.push(newTicket);

        userTickets[msg.sender].push(ticketId);
        if (userLotteries[msg.sender].length == 0 || userLotteries[msg.sender][userLotteries[msg.sender].length - 1] != lotteryId) {
            userLotteries[msg.sender].push(lotteryId);
        }

        emit TicketCreated(lotteryId, ticketId, msg.sender);
    }

    function drawWinner(uint256 lotteryId) public {
        Lottery storage lottery = lotteries[lotteryId];
        require(msg.sender == lottery.creator, "Only creator can draw.");
        require(lottery.isActive, "Draw already done.");
        require(lottery.tickets.length > 0, "No ticket created.");

        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % lottery.tickets.length;
        lottery.winningTicketId = lottery.tickets[randomIndex].id;
        lottery.isActive = false;

        tickets[lottery.winningTicketId].isWinning = true;

        emit LotteryDrawn(lotteryId, lottery.winningTicketId);
    }

    function getDrawableLotteries(address creator) 
        public view 
        returns (Lottery[] memory) 
    {
        uint256 drawableCount = 0;

        for (uint256 i = 1; i <= lotteryCounter; i++) {
            if (lotteries[i].isActive && lotteries[i].creator == creator) {
                drawableCount++;
            }
        }

        uint256 index = 0;
        Lottery[] memory drawableLotteries = new Lottery[](drawableCount);

        for (uint256 i = 1; i <= lotteryCounter; i++) {
            if (lotteries[i].isActive && lotteries[i].creator == creator) {
                drawableLotteries[index] = lotteries[i];
                index++;
            }
        }

        return drawableLotteries;
    }

    function getWinningTicket(uint256 lotteryId) 
        public view 
        returns (Ticket memory)
    {
        return tickets[lotteries[lotteryId].winningTicketId];
    }

    function getTicketsOf(address owner) 
        public view 
        returns (Ticket[] memory) 
    {
        uint256[] memory ownerTicketIds = userTickets[owner];
        Ticket[] memory ownerTickets = new Ticket[](ownerTicketIds.length);

        for (uint256 i = 0; i < ownerTicketIds.length; i++) {
            ownerTickets[i] = tickets[ownerTicketIds[i]];
        }

        return ownerTickets;
    }

    function getLotteriesOf(address owner) 
        public view 
        returns (Lottery[] memory) 
    {
        uint256[] memory ownerLotteryIds = userLotteries[owner];
        Lottery[] memory ownerLotteries = new Lottery[](ownerLotteryIds.length);

        for (uint256 i = 0; i < ownerLotteryIds.length; i++) {
            ownerLotteries[i] = lotteries[ownerLotteryIds[i]];
        }

        return ownerLotteries;
    }

    function getActiveLotteries() 
        public view 
        returns (Lottery[] memory) 
    {
        uint256 activeCount = 0;

        for (uint256 i = 1; i <= lotteryCounter; i++) {
            if (lotteries[i].isActive) {
                activeCount++;
            }
        }

        uint256 index = 0;
        Lottery[] memory activeLotteries = new Lottery[](activeCount);

        for (uint256 i = 1; i <= lotteryCounter; i++) {
            if (lotteries[i].isActive) {
                activeLotteries[index] = lotteries[i];
                index++;
            }
        }

        return activeLotteries;
    }

}