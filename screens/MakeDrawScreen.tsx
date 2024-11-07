import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { useRouter } from 'next/router';
import { Loader2 } from 'lucide-react';
import { Address } from 'viem';
import { lotteryContract } from '@/contracts-data/lotteryContract';
import { Lottery, Ticket } from '@/contracts-data';
import { useToast } from '@/hooks/use-toast';

export default function MakeDrawScreen() {
  const [selectedLottery, setSelectedLottery] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [myActiveLotteries, setMyActiveLotteries] = useState<Lottery[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const userAccount = useAccount();
  const router = useRouter();

  const [contractAddress, setContractAddress] = useState<Address | undefined>();
  const chainId = useChainId();
  const { toast } = useToast();
  const {
    writeContractAsync,
    isPending,
    isSuccess,
    data: txHash,
  } = useWriteContract();

  useEffect(() => {
    const addressOfChainId = lotteryContract.address[chainId];
    setContractAddress(addressOfChainId);
  }, [chainId]);

  const handleDrawLottery = async () => {
    if (!contractAddress) return;
    setIsDrawing(true);
    await writeContractAsync({
      abi: lotteryContract.abi,
      address: contractAddress,
      functionName: 'drawWinner',
      args: [selectedLottery],
    });
  };

  const { refetch: getMyActiveLotteries } = useReadContract({
    abi: lotteryContract.abi,
    address: contractAddress,
    functionName: 'getDrawableLotteries',
    args: [userAccount.address],
    query: {
      enabled: false,
    },
  });

  const { refetch: getWinner } = useReadContract({
    abi: lotteryContract.abi,
    address: contractAddress,
    functionName: 'getWinningTicket',
    args: [selectedLottery],
    query: {
      enabled: false,
    },
  });

  const { data: confirmationData } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (confirmationData) {
      const fetchWinner = async () => {
        const { data: ticketWinner } = await getWinner();
        if (!ticketWinner) {
          setIsDrawing(false);
          toast({
            title: 'Error',
            color: 'error',
            description: 'Error fetching winner',
          });
          return;
        }
        setWinner((ticketWinner as Ticket).owner);
        toast({
          title: 'Success',
          color: 'success',
          onClick: () => {
            window.open(`https://sepolia.basescan.org/tx/${txHash}`, '_blank');
          },
          description: 'Winner drawn successfully',
        });
        setIsDrawing(false);
      };
      if (isDrawing) fetchWinner();
    }
  }, [isPending, isSuccess, txHash, confirmationData]);

  useEffect(() => {
    if (!contractAddress) return;
    const fetchContract = async () => {
      const { data: myActiveLotteries } = await getMyActiveLotteries();
      if (!myActiveLotteries) return;

      setMyActiveLotteries(myActiveLotteries as Lottery[]);
    };
    fetchContract();
  }, [contractAddress, getMyActiveLotteries]);

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
        <CardTitle>Make a Draw</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="lottery-select" className="text-sm font-medium">
            Select Lottery
          </label>
          <Select onValueChange={setSelectedLottery} value={selectedLottery}>
            <SelectTrigger id="lottery-select">
              <SelectValue placeholder="Select a lottery" />
            </SelectTrigger>
            <SelectContent>
              {myActiveLotteries.map(lottery => (
                <SelectItem
                  disabled={!lottery.tickets.length}
                  key={lottery.id}
                  value={lottery.id?.toString()}
                >
                  {lottery.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleDrawLottery}
          disabled={!selectedLottery || isDrawing}
          className="w-full"
        >
          {isDrawing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Drawing...
            </>
          ) : (
            'Make Draw'
          )}
        </Button>
        {winner && (
          <Alert>
            <AlertTitle>Winner Drawn!</AlertTitle>
            <AlertDescription>
              The winning address is: {winner}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
