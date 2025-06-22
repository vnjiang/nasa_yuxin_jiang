//pick another date

export default function PickAnotherDate({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-1 underline text-cyan-200 hover:text-cyan-50 text-sm sm:text-base"
    >
      Pick another date
    </button>
  );
}
