/* eslint-disable react/prop-types */
export default function SingleBox({ value, onClick }) {
  return (
    <div
      className="w-[60px] h-[60px] lg:w-[116px] lg:h-[116px] bg-[#C9F9FC] border-4 border-black rounded-md flex items-center justify-center text-4xl font-bold cursor-pointer"
      onClick={onClick}
    >
      {value === null ? (
        value
      ) : value === "X" ? (
        <img
          src="/tic-tac-toe/X-single.png"
          className="w-10 h-10 lg:w-20 lg:h-20"
        />
      ) : (
        <img
          src="/tic-tac-toe/O-single.png"
          className="w-10 h-10 lg:w-20 lg:h-20"
        />
      )}
    </div>
  );
}
