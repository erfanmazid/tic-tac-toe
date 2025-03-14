import { useEffect, useState } from "react";
import SingleBox from "./SingleBox";
import ResetModal from "../modal/ResetModal";
import StepsModal from "../modal/StepsModal";
import ResultModal from "../modal/ResultModal";
import { useSearchParams } from "react-router-dom";

export default function Boxs() {
  const [box, setBox] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [openModal, setOpenModel] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [end, setEnd] = useState(false);
  const [winnerPlayer, setWinnerPlayer] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const urlStep = parseInt(searchParams.get("step"), 10);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("gameState"));
    if (savedState) {
      setBox(savedState.box);
      setHistory(savedState.history);
      setIsXNext(savedState.isXNext);
      if (urlStep >= 0 && urlStep < savedState.history.length) {
        setCurrentStep(urlStep);
      } else {
        setCurrentStep(savedState.currentStep);
      }
    }
  }, [urlStep]);

  useEffect(() => {
    if (currentStep < history.length) {
      setBox(history[currentStep]);
      setIsXNext(currentStep % 2 === 0);
    }
  }, [currentStep, history]);

  const handleClick = (index) => {
    if (box[index] || calculateWinner(box)) return;

    const updatedHistory = history.slice(0, currentStep + 1);
    const currentBox = [...updatedHistory[currentStep]];
    currentBox[index] = isXNext ? "X" : "O";

    setHistory([...updatedHistory, currentBox]);
    setBox(currentBox);
    setIsXNext(!isXNext);
    setCurrentStep(updatedHistory.length);

    localStorage.setItem(
      "gameState",
      JSON.stringify({
        box: currentBox,
        history: [...updatedHistory, currentBox],
        currentStep: updatedHistory.length,
        isXNext: !isXNext,
      })
    );

    const winner = calculateWinner(currentBox);
    if (winner) {
      setEnd(true);
      setWinnerPlayer(winner);
    } else if (currentBox.every((square) => square !== null)) {
      setEnd(true);
    }
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setBox(history[currentStep - 1]);
      setIsXNext((currentStep - 1) % 2 === 0);
    }
  };

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setBox(history[currentStep + 1]);
      setIsXNext((currentStep - 1) % 2 === 0);
    }
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
    setBox(history[step]);
    setIsXNext((currentStep - 1) % 2 === 0);
    setSearchParams({ step });
  };

  const handleReset = () => {
    if (history.length < 2) return;
    setOpenModel(true);
    setEnd(false);
  };

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (squares) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-200">
      {openModal && (
        <ResetModal
          closeModal={setOpenModel}
          reset={setBox}
          x={setIsXNext}
          setHistory={setHistory}
          setCurrentStep={setCurrentStep}
        />
      )}
      {showSteps && (
        <StepsModal
          closeModal={setShowSteps}
          history={history}
          handleStepClick={handleStepClick}
        />
      )}
      {end && (
        <ResultModal
          winner={winnerPlayer}
          closeModal={setEnd}
          reset={handleReset}
        />
      )}
      <div className="flex justify-center items-center flex-col h-full">
        <div className="w-full flex justify-center items-center gap-6">
          <img
            src="/src/assets/X.png"
            alt="playerX"
            className="w-20 h-20 lg:w-36 lg:h-36"
          />
          <img
            src="/src/assets/O.png"
            alt="playerO"
            className="w-20 h-20 lg:w-36 lg:h-36"
          />
        </div>
        <div className="w-[300px] h-[300px] p-6 lg:w-[500px] lg:h-[500px] border-[10px] border-black rounded-md bg-white grid grid-cols-3 place-items-center lg:p-12 my-7">
          {box.map((value, index) => (
            <SingleBox
              key={index}
              value={value}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <div className="flex justify-center items-center flex-col gap-5 w-full">
          <div className="flex justify-around items-center w-full">
            <div className="w-[116px] h-[45px] bg-[#C9F9FC] border-4 border-black rounded-md flex justify-center items-center">
              <p
                className={
                  currentStep > 0
                    ? "text-2xl font-bold cursor-pointer"
                    : "text-2xl font-bold cursor-not-allowed"
                }
                onClick={() => handleUndo()}
              >
                UNDO
              </p>
            </div>
            <div className="w-[116px] h-[45px] bg-[#FBB500] border-4 border-black rounded-md flex justify-center items-center">
              <p
                className={
                  currentStep < history.length - 1
                    ? "text-2xl font-bold cursor-pointer"
                    : "text-2xl font-bold cursor-not-allowed"
                }
                onClick={() => handleRedo()}
              >
                REDO
              </p>
            </div>
          </div>

          <div className="flex justify-around items-center w-full">
            <div
              className="w-[116px] h-[45px] bg-[#C9F9FC] border-4 border-black rounded-md flex justify-center items-center"
              onClick={() => handleReset()}
            >
              <p className="text-2xl font-bold cursor-pointer">RESET</p>
            </div>
            <div className="w-[116px] h-[45px] bg-[#FBB500] border-4 border-black rounded-md flex justify-center items-center">
              <p
                className="text-2xl font-bold cursor-pointer"
                onClick={() => setShowSteps(true)}
              >
                STEPS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
