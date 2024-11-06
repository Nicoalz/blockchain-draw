import { type Address } from 'viem';
export interface TContract {
  abi: unknown[];
  address: Record<number, Address>;
}
