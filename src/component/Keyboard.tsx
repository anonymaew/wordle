interface KeyboardProps {
  keyHandler: (key: string) => void;
}

const Keyboard = (props: KeyboardProps) => {
  return (
    <div className="w-100 text-white text-center">
      <table className="border-collapse mx-auto">
        <tbody>
          {["QWERTYUIOP", "ASDFGHJKL", "↺ZXCVBNM←"].map((row, rowIndex) => {
            return (
              <tr className="flex items-center justify-center" key={rowIndex}>
                {row.split("").map((letter, letterIndex) => {
                  return (
                    <td
                      className={`flex justify-center items-center bg-zinc-600 border-2 border-zinc-900 text-2xl h-12 ${
                        letter == "↺" || letter == "←" ? "w-12" : "w-8"
                      }`}
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
          <tr className="flex items-center justify-center">
            <td
              onMouseDown={(e) => {
                e.preventDefault();
                props.keyHandler("↵");
              }}
              className="flex justify-center items-center bg-zinc-600 border-2 border-zinc-900 text-2xl h-12 w-48"
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
