import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lottery } from '@/contracts-data';
import { lotteryContract } from '@/contracts-data/lotteryContract';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useChainId, useReadContract } from 'wagmi';

const HomeScreen: React.FC = () => {
  const [contractAddress, setContractAddress] = useState<Address | undefined>(); // => the contract address to use
  const [activeLotteries, setActiveLotteries] = useState<Lottery[]>([]);
  const [isLotteriesLoading, setIsLotteriesLoading] = useState(true);
  const chainId = useChainId();

  useEffect(() => {
    const addressOfChainId = lotteryContract.address[chainId];
    setContractAddress(addressOfChainId);
  }, [chainId]);

  const { refetch: getActiveLotteries } = useReadContract({
    abi: lotteryContract.abi,
    address: contractAddress,
    functionName: 'getActiveLotteries',
    query: {
      enabled: false,
    },
  });

  useEffect(() => {
    setIsLotteriesLoading(true);
    if (!contractAddress) {
      setIsLotteriesLoading(false);
      return;
    }
    const fetchContract = async () => {
      const { data: activeLotteries } = await getActiveLotteries();
      if (!activeLotteries) {
        setIsLotteriesLoading(false);
        return;
      }
      setActiveLotteries(activeLotteries as Lottery[]);
      setIsLotteriesLoading(false);
    };
    fetchContract();
  }, [contractAddress, getActiveLotteries]);

  return (
    <div className="w-full">
      <h1 className="mb-8 text-4xl font-bold">
        Welcome to <span className="gradient-text">Web3 Lottery</span>
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLotteriesLoading ? (
          <Skeleton className="w-full h-[100px]" />
        ) : (
          activeLotteries.map(lottery => (
            <Card key={lottery.id}>
              <CardHeader>
                <CardTitle>{lottery.name}</CardTitle>
                <CardDescription>Prize: Free</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/lottery/${lottery.id}`} passHref>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>{' '}
    </div>
  );
};

export default HomeScreen;
