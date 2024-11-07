import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { lotteryContract } from '@/contracts-data/lotteryContract';
import { Lottery, Ticket } from '@/contracts-data/types';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useAccount, useChainId, useReadContract } from 'wagmi';

interface TicketWithLottery extends Ticket {
  lotteryName: string;
  lotteryStatus: boolean;
}

export default function MyTicketsScreen() {
  const [contractAddress, setContractAddress] = useState<Address | undefined>();
  const [tickets, setTickets] = useState<TicketWithLottery[]>([]);
  const [isTicketsLoading, setIsTicketsLoading] = useState(true);
  const chainId = useChainId();

  const checkStatus = (ticket: TicketWithLottery) => {
    if (ticket.lotteryStatus) {
      return 'Pending';
    }
    switch (ticket.isWinning) {
      case true:
        return 'Won';
      case false:
        return 'Lose';
      default:
        return 'Unknown';
    }
  };

  const { address: userAddress } = useAccount();

  const { refetch: getUserLotteries } = useReadContract({
    abi: lotteryContract.abi,
    address: contractAddress,
    functionName: 'getLotteriesOf',
    args: [userAddress],
    query: {
      enabled: false,
    },
  });

  useEffect(() => {
    setIsTicketsLoading(true);
    if (!contractAddress) {
      setIsTicketsLoading(false);
      return;
    }
    const fetchContract = async () => {
      const { data: lotteries } = await getUserLotteries();
      if (!lotteries) {
        setIsTicketsLoading(false);
        return;
      }

      const tickets = (lotteries as Lottery[]).flatMap((lottery: Lottery) => {
        return lottery.tickets
          .filter(ticket => ticket.owner === userAddress)
          .map(ticket => ({
            ...ticket,
            lotteryName: lottery.name,
            isWinning: lottery.winningTicketId === ticket.id,
            lotteryStatus: lottery.isActive,
          }));
      });

      if (!tickets) {
        setIsTicketsLoading(false);
        return;
      }
      setTickets(tickets as unknown as TicketWithLottery[]);
      setIsTicketsLoading(false);
    };
    fetchContract();
  }, [contractAddress, getUserLotteries]);

  // Set contract address based on chainId
  useEffect(() => {
    if (!chainId) return;
    const addressOfChainId = lotteryContract.address[chainId];
    setContractAddress(addressOfChainId);
  }, [chainId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lottery Name</TableHead>
              <TableHead>Ticket Number</TableHead>
              <TableHead>Is Winning</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map(ticket => {
              const status = checkStatus(ticket);
              const variant =
                status === 'Won'
                  ? 'success'
                  : status === 'Lose'
                    ? 'destructive'
                    : 'outline';
              return (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.lotteryName}</TableCell>
                  <TableCell>{ticket.id.toString()}</TableCell>
                  <TableCell>
                    <Badge variant={variant}>{status}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
