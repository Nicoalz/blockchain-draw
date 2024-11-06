'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export default function CreateLotteryScreen() {
  const [lotteryName, setLotteryName] = useState('');
  const [prizeName, setPrizeName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    console.log('Creating lottery:', {
      lotteryName,
      prizeName,
      ticketPrice,
      endDate,
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create a New Lottery</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lotteryName">Lottery Name</Label>
            <Input
              id="lotteryName"
              value={lotteryName}
              onChange={e => setLotteryName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prizeName">Prize Name</Label>
            <Input
              id="prizeName"
              value={prizeName}
              onChange={e => setPrizeName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticketPrice">Ticket Price (ETH)</Label>
            <Input
              id="ticketPrice"
              type="number"
              step="0.01"
              value={ticketPrice}
              onChange={e => setTicketPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create Lottery
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
