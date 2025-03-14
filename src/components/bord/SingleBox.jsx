/* eslint-disable react/prop-types */
export default function SingleBox({ value, onClick }) {
  return (
    <div
      className="w-[89px] h-[92px] gap-3 lg:w-[116px] lg:h-[116px] bg-[#C9F9FC] border-4 border-black rounded-md flex items-center justify-center text-4xl font-bold cursor-pointer"
      onClick={onClick}
    >
      {value === null ? (
        value
      ) : value === "X" ? (
        <img src="/src/assets/X-O/X.png" />
      ) : (
        <img src="/src/assets/X-O/O.png" />
      )}
    </div>
  );
}
