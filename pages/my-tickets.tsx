import CreateLotteryScreen from '@/screens/CreateLotteryScreen';
import MakeDrawScreen from '@/screens/MakeDrawScreen';
import MyTicketsScreen from '@/screens/MyTicketsScreen';
import type { NextPage } from 'next';
import Head from 'next/head';

const MyTickets: NextPage = () => {
  return (
    <>
      <Head>
        <title>My tickets</title>
        <meta name="description" content="My tickets" />
      </Head>
      <div>
        <MyTicketsScreen />
      </div>
    </>
  );
};

export default MyTickets;
