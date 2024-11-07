import { type Address } from 'viem';
export interface TContract {
  abi: unknown[];
  address: Record<number, Address>;
}

export interface Ticket {
  id: number;
  lotteryId: number;
  owner: Address;
  isWinning: boolean;
}

export interface Lottery {
  id: number;
  name: string;
  creator: Address;
  isActive: boolean;
  winningTicketId: number;
  tickets: Ticket[];
}
