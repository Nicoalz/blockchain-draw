import { useState } from 'react';

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
import { Loader2 } from 'lucide-react';

export default function MakeDrawScreen() {
  const [selectedLottery, setSelectedLottery] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const activeLotteries = [
    { id: '1', name: 'Weekly Jackpot' },
    { id: '2', name: 'Monthly Mega Draw' },
    { id: '3', name: 'Crypto Bonanza' },
  ];

  const handleDraw = async () => {
    if (!selectedLottery) return;

    setIsDrawing(true);
    setWinner(null);

    // Simulate API call to smart contract
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockWinner = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
    setWinner(mockWinner);
    setIsDrawing(false);
  };

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
              {activeLotteries.map(lottery => (
                <SelectItem key={lottery.id} value={lottery.id}>
                  {lottery.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleDraw}
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
