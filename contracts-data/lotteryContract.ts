// Copy and export address & abi
import { type Address } from 'viem';
import { chainIds } from '../config/wagmiProvider';
import { TContract } from './types';

const lotteryContractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lotteryId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'LotteryCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lotteryId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'winningTicketId',
        type: 'uint256',
      },
    ],
    name: 'LotteryDrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lotteryId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'ticketId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'TicketCreated',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'lotteryId', type: 'uint256' }],
    name: 'buyTicket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'createLottery',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'lotteryId', type: 'uint256' }],
    name: 'drawWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getActiveLotteries',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'bool', name: 'isActive', type: 'bool' },
          { internalType: 'uint256', name: 'winningTicketId', type: 'uint256' },
          {
            components: [
              { internalType: 'uint256', name: 'id', type: 'uint256' },
              { internalType: 'uint256', name: 'lotteryId', type: 'uint256' },
              { internalType: 'address', name: 'owner', type: 'address' },
              { internalType: 'bool', name: 'isWinning', type: 'bool' },
            ],
            internalType: 'struct LotteryPlatform.Ticket[]',
            name: 'tickets',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LotteryPlatform.Lottery[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'creator', type: 'address' }],
    name: 'getDrawableLotteries',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'bool', name: 'isActive', type: 'bool' },
          { internalType: 'uint256', name: 'winningTicketId', type: 'uint256' },
          {
            components: [
              { internalType: 'uint256', name: 'id', type: 'uint256' },
              { internalType: 'uint256', name: 'lotteryId', type: 'uint256' },
              { internalType: 'address', name: 'owner', type: 'address' },
              { internalType: 'bool', name: 'isWinning', type: 'bool' },
            ],
            internalType: 'struct LotteryPlatform.Ticket[]',
            name: 'tickets',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LotteryPlatform.Lottery[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'getLotteriesOf',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'bool', name: 'isActive', type: 'bool' },
          { internalType: 'uint256', name: 'winningTicketId', type: 'uint256' },
          {
            components: [
              { internalType: 'uint256', name: 'id', type: 'uint256' },
              { internalType: 'uint256', name: 'lotteryId', type: 'uint256' },
              { internalType: 'address', name: 'owner', type: 'address' },
              { internalType: 'bool', name: 'isWinning', type: 'bool' },
            ],
            internalType: 'struct LotteryPlatform.Ticket[]',
            name: 'tickets',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LotteryPlatform.Lottery[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'getTicketsOf',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'uint256', name: 'lotteryId', type: 'uint256' },
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'bool', name: 'isWinning', type: 'bool' },
        ],
        internalType: 'struct LotteryPlatform.Ticket[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'lotteryId', type: 'uint256' }],
    name: 'getWinningTicket',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'uint256', name: 'lotteryId', type: 'uint256' },
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'bool', name: 'isWinning', type: 'bool' },
        ],
        internalType: 'struct LotteryPlatform.Ticket',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'lotteries',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'bool', name: 'isActive', type: 'bool' },
      { internalType: 'uint256', name: 'winningTicketId', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lotteryCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ticketCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'tickets',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'lotteryId', type: 'uint256' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'bool', name: 'isWinning', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'userLotteries',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'userTickets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const lotteryContractAddressBaseSepolia =
  '0x15247Cf96cF134191e26a8caf748CF90C3f97042' as Address;

export const lotteryContract: TContract = {
  abi: lotteryContractAbi,
  address: {
    [chainIds.sepolia]: lotteryContractAddressBaseSepolia, // chainId => address
  },
};
