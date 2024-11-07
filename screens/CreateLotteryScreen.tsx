'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { type Address } from 'viem';
import { lotteryContract } from '@/contracts-data/lotteryContract';
import { useToast } from '@/hooks/use-toast';

export default function CreateLotteryScreen() {
  const [lotteryName, setLotteryName] = useState('');
  const userAccount = useAccount();
  const router = useRouter();
  const { toast } = useToast();

  const {
    writeContract,
    isPending,
    isSuccess,
    data: txHash,
  } = useWriteContract();
  const [contractAddress, setContractAddress] = useState<Address | undefined>();
  const { chainId } = useAccount();

  useEffect(() => {
    if (!chainId) return;
    const addressOfChainId = lotteryContract.address[chainId];
    setContractAddress(addressOfChainId);
  }, [chainId]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Lottery Created',
        description: 'Your lottery has been created successfully',
        onClick: () => {
          window.open(`https://sepolia.basescan.org/tx/${txHash}`, '_blank');
        },
      });
      setLotteryName('');
    }
  }, [isSuccess, toast]);

  const handleCreateLottery = () => {
    if (!contractAddress) return;
    writeContract({
      abi: lotteryContract.abi,
      address: contractAddress,
      functionName: 'createLottery',
      args: [lotteryName],
    });
  };

  const { isConnected } = userAccount;

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create a New Lottery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lotteryName">Lottery Name</Label>
            <Input
              id="lotteryName"
              value={lotteryName}
              onChange={e => setLotteryName(e.target.value)}
              required
            />
          </div>

          <Button
            disabled={isPending || !lotteryName}
            type="button"
            onClick={handleCreateLottery}
            className="w-full"
          >
            {isPending && 'Pending'}
            {!isPending && 'Create Lottery'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
