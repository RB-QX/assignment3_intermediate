import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    setDisplay(display + value);
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleCalculate = () => {
    try {
      // Using eval() for simplicity; in production consider safer alternatives.
      // eslint-disable-next-line no-eval
      const result = eval(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display || "0"}</div>
      <div className="buttons">
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={handleClear} className="clear">Clear</button>
      </div>
    </div>
  );
};

export default Calculator;
