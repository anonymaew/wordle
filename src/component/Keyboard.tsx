import style from "../pages/wordle.module.scss";

interface KeyboardProps {
  keyHandler: (key: string) => void;
}

const Keyboard = (props: KeyboardProps) => {
  return (
    <div className={style.keyboard}>
      <table>
        <tbody>
          {["QWERTYUIOP", "ASDFGHJKL", "↺ZXCVBNM←"].map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.split("").map((letter, letterIndex) => {
                  return (
                    <td
                      className={
                        letter == "↺" || letter == "←"
                          ? style.keyboardButtonBig
                          : style.keyboardButton
                      }
                      key={letterIndex}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        props.keyHandler(letter);
                      }}
                    >
                      {letter}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            <td
              onMouseDown={(e) => {
                e.preventDefault();
                props.keyHandler("↵");
              }}
              style={{ minWidth: "12rem" }}
            >
              ↵
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Keyboard;
