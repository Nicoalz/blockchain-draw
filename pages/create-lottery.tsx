import CreateLotteryScreen from '@/screens/CreateLotteryScreen';
import type { NextPage } from 'next';
import Head from 'next/head';

const CreateLottery: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create lottery</title>
        <meta name="description" content="Create Lottery" />
      </Head>
      <div>
        <CreateLotteryScreen />
      </div>
    </>
  );
};

export default CreateLottery;
