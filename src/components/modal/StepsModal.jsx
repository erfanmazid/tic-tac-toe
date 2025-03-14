/* eslint-disable react/prop-types */
export default function StepsModal({ closeModal, history, handleStepClick }) {
  const handleClick = (step) => {
    handleStepClick(step);
    closeModal(false);
  };

  return (
    <div className="w-screen h-screen fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white w-96 h-[70%] rounded-lg p-6 flex justify-start items-center flex-col gap-4 relative">
        <div className="w-full text-center ">
          <h2 className="text-2xl font-bold text-[#FBB500]">Game Steps</h2>
        </div>
        <div className="w-full h-full overflow-y-auto flex justify-stat items-center flex-col gap-1">
          {history.length > 1 &&
            history.map((value, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-gray-100 h-14 rounded-lg hover:bg-gray-200 transition p-3 text-center"
                  onClick={() => handleClick(index)}
                >
                  <h3 className="text-lg font-semibold">
                    back to step {index}
                  </h3>
                </div>
              );
            })}
        </div>
        <div className="w-full h-14 flex justify-center items-center">
          <button
            className="w-24 py-2 px-3 bg-red-700 rounded-lg text-white font-semibold"
            onClick={() => closeModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
