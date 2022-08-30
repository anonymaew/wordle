import Wordle from './Wordle';

export const WordleClassic = () => {
  return (
    <div>
      <h1 className="font-bold text-4xl">Wordle Classic</h1>
      <Wordle length={5} guess={6} mult={1} />
    </div>
  );
};
