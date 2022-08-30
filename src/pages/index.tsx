import Head from 'next/head';

import { WordleClassic } from '../component/WordleMode';

const MainPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900 text-white text-center">
      <Head>
        <title>Wordle Plus</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/wordle/manifest.json" />
        <meta name="theme-color" content="#990000" />
      </Head>
      <WordleClassic />
    </div>
  );
};

export default MainPage;
