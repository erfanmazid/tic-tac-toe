import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ResetModal({
  closeModal,
  reset,
  x,
  setHistory,
  setCurrentStep,
}) {
  const [setSearchParams] = useSearchParams();

  const handleReset = () => {
    reset(Array(9).fill(null));
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
    closeModal(false);
    x(true);
    localStorage.removeItem("gameState");
    setSearchParams({});
  };
  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 bg-slate-700 bg-opacity-50">
      <div className="w-[320px] h-[170px] bg-white rounded-lg flex justify-evenly items-center flex-col">
        <p className="text-xl font-bold text-center">Are you sure?</p>
        <div className="flex justify-center items-center gap-16">
          <button
            className="bg-green-700 w-24 h-12 rounded-lg text-xl font-semibold text-white"
            onClick={() => handleReset()}
          >
            yes!
          </button>
          <button
            className="bg-red-700 w-24 h-12 rounded-lg text-xl font-semibold text-white"
            onClick={() => closeModal(false)}
          >
            no!
          </button>
        </div>
      </div>
    </div>
  );
}
