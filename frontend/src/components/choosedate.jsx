//choose date at the beginning

export default function ChooseDate({
    pendingDate,
    setPendingDate,
    setDate,
    today
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">

            {/* choose date box*/}
            <div className="bg-white rounded-3xl px-6 py-6 sm:px-10 sm:py-8 flex flex-col items-center shadow-2xl w-[90vw] max-w-sm sm:max-w-md md:max-w-xl">
              
                <div className="text-2xl md:text-3xl lg:text-4xl mb-6 font-bold text-gray-900" style={{ textShadow: "0 0 10px #00e6ff" }}>
                    you want to travel to?
                </div>

                <input
                    type="date"
                    className="mb-6 p-2 border rounded text-base sm:text-xl w-full"
                    value={pendingDate}
                    max={today}
                    onChange={e => setPendingDate(e.target.value)}
                    style={{
                        background: "#f5f7fa",
                        color: "rgb(158, 157, 157)",
                        maxWidth: 170,    
                        boxSizing: 'border-box',
                        fontWeight: 550
                    }}
                />


                <button
                    onClick={() => {
                        setDate(pendingDate);
                        setPendingDate('');
                    }}
                    disabled={!pendingDate}
                    className="bg-black text-white px-5 sm:px-6 py-2 rounded-full font-bold text-lg sm:text-xl transition disabled:opacity-40 shadow-lg w-full"
                    style={{
                        boxShadow: "0 0 16px #00e6ff, 0 0 32px #111",
                     maxWidth: 250
                    }}
                >
                    Start the Journey
                </button>

            </div>
        </div>
    );
}
