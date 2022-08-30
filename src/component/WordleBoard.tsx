import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import data from '../public/words.json';

interface WordleBoardProps {
  length: number;
  guess: number;
  answer: string;
}

export interface WordleBoardInterface {
  resetGame: () => void;
  addKey: (key: string) => void;
  deleteKey: () => void;
  enter: () => void;
}

const WordleBoard = forwardRef((props: WordleBoardProps, ref) => {
  const [words, setWords] = useState(Array(props.guess).fill(""));
  const [wordsLevel, setWordsLevel] = useState(0);
  const [wordsColor, setWordsColor] = useState(
    Array(props.guess).fill("-".repeat(props.length))
  );
  const [status, setStatus] = useState<String[]>(["", ""]);
  const [freeze, setFreeze] = useState(false);

  useEffect(() => {
    let newWordsColor: string[] = [];
    for (let j = 0; j < props.guess; j++) {
      let guess = (words[j] ?? "").toLowerCase();
      let answer = props.answer;
      let result: string = "-".repeat(props.length);
      if (guess != "") {
        for (let i = 0; i < props.length; i++) {
          if (guess[i] == answer[i]) {
            result = result.slice(0, i) + "G" + result.slice(i + 1);
            answer = answer.slice(0, i) + "_" + answer.slice(i + 1);
            guess = guess.slice(0, i) + "-" + guess.slice(i + 1);
          }
        }
        for (let i = 0; i < props.length; i++) {
          if (answer.includes(guess[i])) {
            result = result.slice(0, i) + "Y" + result.slice(i + 1);
            answer = answer.replace(guess[i], "_");
            guess = guess.replace(guess[i], "-");
          }
        }
        for (let i = 0; i < props.length; i++) {
          if (guess[i] != "-") {
            result = result.slice(0, i) + "B" + result.slice(i + 1);
          }
        }
      }
      newWordsColor.push(result);
    }
    setWordsColor(newWordsColor);
  }, [wordsLevel]);

  useImperativeHandle(ref, () => ({
    addKey: (c: string) => {
      if (freeze) return;
      if (words[wordsLevel].length < props.length) {
        setWords(
          words.map((w, i) => (i === wordsLevel ? w + c.toUpperCase() : w))
        );
      }
    },

    deleteKey: () => {
      if (freeze) return;
      if (words[wordsLevel].length > 0) {
        setWords(words.map((w, i) => (i === wordsLevel ? w.slice(0, -1) : w)));
      }
    },

    enter: () => {
      if (freeze) return;
      if (words[wordsLevel].length < props.length) {
        setStatus(["❌ Not enough letters!", ""]);
      } else {
        if (checkWord(words[wordsLevel].toLowerCase())) {
          setWordsLevel((i) => i + 1);
          if (words[wordsLevel].toLowerCase() == props.answer) {
            setFreeze(true);
            setStatus(["🎉 Yes! The word is ", props.answer]);
            return;
          }
          if (wordsLevel == props.guess - 1) {
            setFreeze(true);
            setStatus(["😩 The answer is ", props.answer]);
            return;
          }
        } else {
          setStatus(["🤔 There is no such word ", words[wordsLevel]]);
        }
      }
    },

    resetGame: () => {
      setWords(Array(props.guess).fill("".repeat(props.length)));
      setWordsLevel(0);
      setWordsColor(Array(props.guess).fill("-".repeat(props.length)));
      setFreeze(false);
    },
  }));

  const checkWord = (word: string) => {
    return data.list.includes(word);
  };

  return (
    <div className="inline-block m-4 overflow-auto p-0">
      <table className="mx-auto border-collapse">
        <tbody>
          {words.map((word: string, rindex: number) => {
            return (
              <tr key={rindex}>
                {word
                  .padEnd(props.length)
                  .split("")
                  .map((letter, index) => {
                    return (
                      <td
                        className={`w-16 h-16 border-4 border-zinc-500 text-5xl ${
                          !wordsColor[rindex][index]
                            ? "bg-zinc-900"
                            : wordsColor[rindex][index] == "G"
                            ? "bg-green-600"
                            : wordsColor[rindex][index] == "Y"
                            ? "bg-yellow-500"
                            : wordsColor[rindex][index] == "B"
                            ? "bg-zinc-700"
                            : "bg-zinc-900"
                        }`}
                        key={rindex * 10 + index}
                      >
                        {letter}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        {status[0]}
        <a href={`https://www.britannica.com/dictionary/${status[1]}`}>
          {status[1].toUpperCase()}
        </a>
      </p>
    </div>
  );
});

export default WordleBoard;
