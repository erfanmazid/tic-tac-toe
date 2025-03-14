/* eslint-disable react/prop-types */
export default function ResultModal({ winner, closeModal, reset }) {
  console.log(winner);

  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 bg-slate-700 bg-opacity-50">
      <div className="w-[400px] h-[200px] bg-white rounded-lg flex justify-around items-center flex-col ">
        <div>
          {winner !== null ? (
            <h2 className="text-2xl font-bold text-indigo-800">
              Player {winner} is Winner!
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-indigo-800">
              It&apos;s a draw!
            </h2>
          )}
        </div>
        <div className="flex justify-around items-center w-full">
          <div
            className="w-[116px] h-[45px] bg-[#C9F9FC] border-4 border-black rounded-md flex justify-center items-center"
            onClick={() => reset()}
          >
            <p className="text-2xl font-bold cursor-pointer">RESET</p>
          </div>
          <div className="w-[116px] h-[45px] bg-[#FBB500] border-4 border-black rounded-md flex justify-center items-center">
            <p
              className="text-2xl font-bold cursor-pointer"
              onClick={() => closeModal(false)}
            >
              Close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
