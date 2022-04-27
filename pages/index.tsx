import Head from "next/head";
import style from "./wordle.module.scss";
import { WordleClassic } from "../component/WordleMode";

const MainPage = () => {
  return (
    <div className={style.page}>
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
