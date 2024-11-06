import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDateHour } from '@/functions/utils/date';

export default function LotteryDetailsScreen() {
  const router = useRouter();
  const { id } = router.query;

  console.log('Lottery ID:', id);

  const lotteryDetails = {
    name: 'Weekly Jackpot',
    prize: '100 ETH',
    ticketPrice: '0.1 ETH',
    endTime: '2023-06-30',
    totalTickets: 1000,
    soldTickets: 750,
  };

  const buyTicket = () => {
    console.log('Buying ticket for lottery:', id);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{lotteryDetails.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <strong>Prize:</strong> {lotteryDetails.prize}
        </p>
        <p>
          <strong>Ticket Price:</strong> {lotteryDetails.ticketPrice}
        </p>
        <p>
          <strong>End Date:</strong> {formatDateHour(lotteryDetails.endTime)}
        </p>
        <p>
          <strong>Total Tickets:</strong> {lotteryDetails.totalTickets}
        </p>
        <p>
          <strong>Tickets Sold:</strong> {lotteryDetails.soldTickets}
        </p>
        <div className="w-full bg-secondary rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{
              width: `${(lotteryDetails.soldTickets / lotteryDetails.totalTickets) * 100}%`,
            }}
          ></div>
        </div>
        <Button onClick={buyTicket} className="w-full">
          Buy Ticket
        </Button>
      </CardContent>
    </Card>
  );
}
