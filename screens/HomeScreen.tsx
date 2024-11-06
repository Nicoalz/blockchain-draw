import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateHour } from '@/functions/utils/date';
import Link from 'next/link';

const HomeScreen: React.FC = () => {
  const activeLotteries = [
    { id: 1, name: 'Weekly Jackpot', prize: '100 ETH', endTime: '2023-06-30' },
    {
      id: 2,
      name: 'Monthly Mega Draw',
      prize: '500 ETH',
      endTime: '2023-07-31',
    },
    { id: 3, name: 'Crypto Bonanza', prize: '1000 ETH', endTime: '2023-08-15' },
  ];

  return (
    <div className="w-full">
      <h1 className="mb-8 text-4xl font-bold">
        Welcome to <span className="gradient-text">Web3 Lottery</span>
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeLotteries.map(lottery => (
          <Card key={lottery.id}>
            <CardHeader>
              <CardTitle>{lottery.name}</CardTitle>
              <CardDescription>Prize: {lottery.prize}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Ends on: {formatDateHour(lottery.endTime)}</p>
              <Link href={`/lottery/${lottery.id}`} passHref>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>{' '}
    </div>
  );
};

export default HomeScreen;
