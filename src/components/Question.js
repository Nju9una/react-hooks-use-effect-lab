import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function to clear the timer
  }, [timeRemaining]); // Run effect when timeRemaining changes

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset timeRemaining to 10 seconds
      onAnswered(false); // Trigger behavior in App component
    }
  }, [timeRemaining, onAnswered]); // Run effect when timeRemaining or onAnswered changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer when an answer is clicked
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;










