import type { NextPage } from 'next';
import Head from 'next/head';
import HomeScreen from '@/screens/HomeScreen';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Head>
      <div>
        <HomeScreen />
      </div>
    </>
  );
};

export default Home;
