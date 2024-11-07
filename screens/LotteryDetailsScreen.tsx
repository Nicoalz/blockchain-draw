import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import { lotteryContract } from '@/contracts-data/lotteryContract';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface LotterySimplified {
  id: string;
  name: string;
}

export default function LotteryDetailsScreen() {
  const router = useRouter();
  const { id: lotteryId } = router.query;
  const [contractAddress, setContractAddress] = useState<Address | undefined>();
  const [activeLottery, setActiveLottery] = useState<LotterySimplified | null>(
    null,
  );
  const [isLotteryLoading, setIsLotteryLoading] = useState(true);
  const { isConnected } = useAccount();
  const { toast } = useToast();
  const {
    writeContract,
    isPending,
    isSuccess,
    data: txHash,
  } = useWriteContract();
  const chainId = useChainId();

  const handleBuyTicket = () => {
    if (!contractAddress) return;
    if (!lotteryId) return;
    writeContract({
      abi: lotteryContract.abi,
      address: contractAddress,
      functionName: 'buyTicket',
      args: [lotteryId],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Ticket Bought',
        style: {
          cursor: 'pointer',
        },
        description: 'Your ticket has been bought successfully',
        onClick: () => {
          window.open(`https://sepolia.basescan.org/tx/${txHash}`, '_blank');
        },
      });
    }
  }, [isSuccess, toast]);

  useEffect(() => {
    if (!chainId) return;
    const addressOfChainId = lotteryContract.address[chainId];
    setContractAddress(addressOfChainId);
  }, [chainId]);

  const { refetch: getActiveLottery } = useReadContract({
    abi: lotteryContract.abi,
    address: contractAddress,
    functionName: 'lotteries',
    args: [lotteryId],
    query: {
      enabled: false,
    },
  });

  useEffect(() => {
    setIsLotteryLoading(true);
    if (!contractAddress) {
      setIsLotteryLoading(false);
      return;
    }
    const fetchContract = async () => {
      const { data: activeLotteries } = await getActiveLottery();
      if (!activeLotteries) {
        setIsLotteryLoading(false);
        return;
      }

      const parsedLottery = {
        id: (activeLotteries as string[])[0],
        name: (activeLotteries as string[])[1],
      };

      setActiveLottery(parsedLottery as LotterySimplified);
      setIsLotteryLoading(false);
    };
    fetchContract();
  }, [contractAddress, getActiveLottery, lotteryId]);

  return isLotteryLoading ? (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-32 h-6 bg-gray-200" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-24 h-4 mt-2 bg-gray-200" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <Skeleton className="w-full h-10 bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{activeLottery?.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <strong>Ticket Price:</strong> Free
        </p>
        <Button
          disabled={isPending || isSuccess || !activeLottery || !isConnected}
          onClick={handleBuyTicket}
          className="w-full"
        >
          Buy Ticket
        </Button>
      </CardContent>
    </Card>
  );
}
