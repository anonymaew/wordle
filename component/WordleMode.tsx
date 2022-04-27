import Wordle from "./Wordle";

export const WordleClassic = () => {
  return (
    <div>
      <h1>Wordle Classic</h1>
      <Wordle length={5} guess={6} mult={1} />
    </div>
  );
};
