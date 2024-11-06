import LotteryDetailsScreen from '@/screens/LotteryDetailsScreen';
import type { NextPage } from 'next';
import Head from 'next/head';

const LotteryDetails: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lottery Details</title>
        <meta name="description" content="Lottery Details" />
      </Head>
      <div>
        <LotteryDetailsScreen />
      </div>
    </>
  );
};

export default LotteryDetails;
