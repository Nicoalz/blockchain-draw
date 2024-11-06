import CreateLotteryScreen from '@/screens/CreateLotteryScreen';
import MakeDrawScreen from '@/screens/MakeDrawScreen';
import type { NextPage } from 'next';
import Head from 'next/head';

const MakeDraw: NextPage = () => {
  return (
    <>
      <Head>
        <title>Make a draw</title>
        <meta name="description" content="Make a draw" />
      </Head>
      <div>
        <MakeDrawScreen />
      </div>
    </>
  );
};

export default MakeDraw;
