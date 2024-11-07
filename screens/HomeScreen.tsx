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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useChainId, useReadContract } from 'wagmi';

const HomeScreen: React.FC = () => {
  const [contractAddress, setContractAddress] = useState<Address | undefined>();
  const [activeLotteries, setActiveLotteries] = useState<Lottery[]>([]);
  const [isLotteriesLoading, setIsLotteriesLoading] = useState(true);
  const chainId = useChainId();

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

  // Set contract address based on chainId
  useEffect(() => {
    if (!chainId) return;
    const addressOfChainId = lotteryContract.address[chainId];
    setContractAddress(addressOfChainId);
  }, [chainId]);

  return (
    <div className="w-full">
      <h1 className="mb-8 text-4xl font-bold">
        Welcome to <span className="gradient-text">Web3 Lottery</span>
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(() => {
          if (isLotteriesLoading) {
            return Array.from({ length: 3 }).map((_, index) => (
              <Card key={index + 1}>
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
            ));
          } else if (activeLotteries.length === 0) {
            return <p>No active lotteries</p>;
          } else {
            return activeLotteries.map(lottery => (
              <Card key={lottery.id}>
                <CardHeader>
                  <CardTitle>{lottery.name}</CardTitle>
                  <CardDescription>Prize: Free</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/lottery/${lottery.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ));
          }
        })()}
      </div>{' '}
    </div>
  );
};

export default HomeScreen;
