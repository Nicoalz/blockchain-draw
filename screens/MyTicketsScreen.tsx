import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateHour } from '@/functions/utils/date';

export default function MyTicketsScreen() {
  // Mock data - in a real app, you'd fetch this from your web3 contract
  const tickets = [
    {
      id: 1,
      lotteryName: 'Weekly Jackpot',
      ticketNumber: '12345',
      purchaseDate: '2023-06-15',
    },
    {
      id: 2,
      lotteryName: 'Monthly Mega Draw',
      ticketNumber: '67890',
      purchaseDate: '2023-06-10',
    },
    {
      id: 3,
      lotteryName: 'Crypto Bonanza',
      ticketNumber: '54321',
      purchaseDate: '2023-06-05',
    },
  ];

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
              <TableHead>Purchase Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map(ticket => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.lotteryName}</TableCell>
                <TableCell>{ticket.ticketNumber}</TableCell>
                <TableCell>{formatDateHour(ticket.purchaseDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
