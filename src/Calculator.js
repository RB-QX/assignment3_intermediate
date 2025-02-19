import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [preview, setPreview] = useState("");

  // Create audio objects using template literals for correct paths.
  const clickSound = new Audio(`${process.env.PUBLIC_URL}/sounds/click.mp3`);
  const operatorSound = new Audio(`${process.env.PUBLIC_URL}/sounds/operator.mp3`);
  const clearSound = new Audio(`${process.env.PUBLIC_URL}/sounds/clear.mp3`);
  const equalsSound = new Audio(`${process.env.PUBLIC_URL}/sounds/equals.mp3`);

  // Optional: Add error event listeners for debugging
  [clickSound, operatorSound, clearSound, equalsSound].forEach((audio, idx) => {
    audio.addEventListener('error', (e) => {
      console.error(`Error loading sound ${idx}:`, e);
    });
  });

  useEffect(() => {
    if (display === "") {
      setPreview("");
      return;
    }
    try {
      const result = evaluate(display);
      setPreview(result);
    } catch (error) {
      // Incomplete expression: ignore errors
      setPreview("");
    }
  }, [display]);

  // Play a sound based on the button value.
  const playSound = (value) => {
    if (value === "Clear") {
      clearSound.play().catch(err => console.error('Clear sound error:', err));
    } else if (value === "=") {
      equalsSound.play().catch(err => console.error('Equals sound error:', err));
    } else if (["/", "*", "-", "+"].includes(value)) {
      operatorSound.play().catch(err => console.error('Operator sound error:', err));
    } else {
      clickSound.play().catch(err => console.error('Click sound error:', err));
    }
  };

  const handleClick = (value) => {
    playSound(value);
    setDisplay(display + value);
  };

  const handleClear = () => {
    playSound("Clear");
    setDisplay("");
    setPreview("");
  };
  const handleCalculate = () => {
    playSound("=");
    try {
      const result = evaluate(display);
      setDisplay(result.toString());
      setPreview("");
    } catch (error) {
      setDisplay("Error");
      setPreview("");
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        {preview !== "" && <div className="preview">= {preview}</div>}
        <div className="current">{display || "0"}</div>
      </div>
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
