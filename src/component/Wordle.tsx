import { useState, useEffect, RefObject, createRef } from "react";
import style from "../pages/wordle.module.scss";
import WordleBoard, { WordleBoardInterface } from "./WordleBoard";
import Keyboard from "./Keyboard";
import data from "../public/words.json";

interface WordleProps {
  length: number;
  guess: number;
  mult: number;
}

const Wordle = (props: WordleProps) => {
  const [wordAnswer, setWordAnswer] = useState([""]);
  const [boardRef, setBoardRef] = useState([createRef<WordleBoardInterface>()]);

  useEffect(() => {
    let refList: RefObject<WordleBoardInterface>[] = [];
    for (let i = 0; i < props.mult; i++) {
      refList.push(createRef());
    }
    setBoardRef(refList);
    resetGame();
  }, []);

  useEffect(() => {
    console.log(wordAnswer);
  }, [wordAnswer]);

  const pickWord = (length: number) => {
    let word = data.list[Math.floor(Math.random() * data.length)];
    while (word.length !== length) {
      word = data.list[Math.floor(Math.random() * data.length)];
    }
    return word;
  };

  const keyHandler = (key: string) => {
    if (key == "↺") {
      resetGame();
    } else if (key == " " || key == "Enter" || key == "↵") {
      enter();
    } else if (key == "Backspace" || key == "←") {
      deleteKey();
    } else if (
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(key)
    ) {
      addKey(key);
    }
  };

  const addKey = (c: string) => {
    for (let board of boardRef) {
      board.current?.addKey(c);
    }
  };

  const deleteKey = () => {
    for (let board of boardRef) {
      board.current?.deleteKey();
    }
  };

  const enter = () => {
    for (let board of boardRef) {
      board.current?.enter();
    }
  };

  const resetGame = () => {
    let newAnswers: string[] = [];
    for (let i = 0; i < props.mult; i++) {
      newAnswers.push(pickWord(props.length));
    }
    setWordAnswer(newAnswers);
    for (let board of boardRef) {
      board.current?.resetGame();
    }
  };

  return (
    <div
      className={style.wordlePage}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        keyHandler(e.key);
      }}
      tabIndex={0}
    >
      {wordAnswer.map((answer, i) => {
        return (
          <WordleBoard
            key={i}
            ref={boardRef[i]}
            answer={answer}
            length={props.length}
            guess={props.guess}
          />
        );
      })}
      <p>{}</p>
      <Keyboard keyHandler={keyHandler} />
    </div>
  );
};

const SearchButton = (props: any) => {
  return (
    <a
      className={style.hyperlink}
      href={"https://www.merriam-webster.com/dictionary/" + props.word}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.word.toUpperCase()}
    </a>
  );
};

export default Wordle;
