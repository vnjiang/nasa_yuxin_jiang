import { useState, useEffect } from 'react';
import axios from 'axios';
import AnotherDate from './anotherdate';
import ChooseDate from './choosedate';
import MusicPlayer from './musicplayer';

export default function Apod() {
  const [date, setDate] = useState("");
  const [pendingDate, setPendingDate] = useState("");
  const [data, setData] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const today = new Date().toISOString().slice(0, 10);


  //fetch apod data when date is exist
  useEffect(() => {
    if (!date) {
      setData(null);
      setError('');
      setLoading(false);
      return;
    }
    async function fetchApod() {
      setLoading(true);
      setError('');
      setData(null);
      try {
        const res = await axios.get(`https://nasa-yuxin-jiang.onrender.com/apod?date=${date}`);
        setData(res.data);
      } catch (err) {
        setError('The universe was on a break this day. Try picking another date!');
      } finally {
        setLoading(false);
      }
    }
    fetchApod();
  }, [date]);



  //handle AI generated summary
  const handleGetSummary = async () => {
    setAiLoading(true);
    try {
      const res = await axios.post('https://nasa-yuxin-jiang.onrender.com/ai', {
        explanation: data.explanation,
      });
      setAiSummary(res.data.summary);
    } catch (err) {
      setAiSummary('Sorry, AI is on a break💤');
    } finally {
      setAiLoading(false);
    }
  };


  // background image or video from Apod
  let bgContent = null;
  if (data) {
    if (data.media_type === 'image') {
      bgContent = (
        <img
          src={data.url}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: "brightness(0.85) blur(0.5px)" }}
        />
      );
    } else if (data.media_type === 'video') {
      bgContent = (
        <iframe
          src={data.url}
          title={data.title}
          className="absolute inset-0 w-full h-full object-cover z-0"
          allow="autoplay; fullscreen"
          frameBorder="0"
          style={{ filter: "brightness(0.9)" }}
        />
      );
    }
  }



  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        fontFamily: 'Share Tech Mono, Arial, monospace',
        background: '#111',
      }}
    >


      {/* choose date at the beginning */}
      {!date && (
        <ChooseDate
          pendingDate={pendingDate}
          setPendingDate={setPendingDate}
          setDate={setDate}
          today={today}
        />
      )}

      {bgContent}

      <MusicPlayer src="/music/bgm.mp3" />


      {/* content box */}
      {date && data && !collapsed && (
        <div className=" absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 
        z-20 w-[95vw] max-w-2xl flex flex-col items-center pointer-events-auto">

          {/* collapse icon */}
          <button
            className="absolute top-2 right-3 z-30 bg-black/50 rounded-full p-2 hover:bg-black/70"
            style={{ fontSize: 32, color: "white" }}
            title="Hide"
            onClick={() => setCollapsed(true)}
          >
            —
            </button>


          <div className="  flex flex-col items-center gap-4 w-full px-3 sm:px-6 py-4 sm:py-6 rounded-2xl  bg-black/40 backdrop-blur-md ">
        
              {/*title */}
            <h2 className="text-xl sm:text-3xl font-bold mb-1 text-white text-center" style={{ textShadow: "0 0 12px #00e6ff" }}>{data.title}</h2>
           
           
              {/*date */}
            <p className="text-sm sm:text-base text-cyan-100 mb-1">{data.date}</p>

             {/* show explanation details */}
            <button
              onClick={() => setShowExplanation(true)}
              className="bg-cyan-400 bg-opacity-90 hover:bg-cyan-300 text-black font-bold px-4 sm:px-6 py-2 rounded-xl shadow-xl text-base sm:text-lg transition"
              style={{ boxShadow: "0 0 8px #00e6ff, 0 0 32px #111" }}
            >
              Show Details
            </button>

             {/* pick another date */}
            <AnotherDate onClick={() => {
              setDate('');
              setPendingDate('');
            }} />

          </div>
        </div>
      )}


    {/* show content box icon */}
      {collapsed && (
        <button
          className="fixed bottom-7 right-7 z-40 bg-black/50 hover:bg-black/80 rounded-full p-3 shadow-lg"
          style={{ fontSize: 40, color: "white" }}
          title="Show Info"
          onClick={() => setCollapsed(false)}
        >
          +
        </button>
      )}




      {/* loading  */}
      {date && loading && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-white text-lg sm:text-2xl text-center">
            Loading...
          </div>
        </div>
      )}

      {/* error */}
      {date && error && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="flex flex-col items-center">
            <div className="text-red-500 text-lg sm:text-2xl mb-2 text-center">
              {error}
            </div>
            <AnotherDate onClick={() => {
              setDate('');
              setPendingDate('');
              setError('');
            }} />
          </div>
        </div>
      )}


      {/* Show explanation */}
      {showExplanation && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white rounded-2xl px-4 py-5 sm:px-10 sm:py-8 flex flex-col items-center shadow-2xl w-[90vw] max-w-xl relative">
           
           {/* close explanation icon*/}
            <button
              className="absolute top-2 right-4 text-gray-400 text-2xl sm:text-3xl font-bold hover:text-black"
              onClick={() => setShowExplanation(false)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              ×
              </button>

            {/* title */}
            <div className="text-lg sm:text-2xl font-bold mb-3 text-black text-center">{data.title}</div>

            {/* AI  summary */}
            <div className="w-full mb-4">
              <button
                onClick={handleGetSummary}
                className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg font-bold shadow-md"
              >
                Summarize with AI
              </button>

             {/* if AI is loading */}
              {aiLoading && <p className="text-sm text-gray-500 mt-2">I am thinking...</p>}

             {/* AI summary content */}
              {aiSummary && (
                <div className="mt-3 p-3 border rounded bg-gray-100 text-gray-800 text-sm whitespace-pre-line">
                  {aiSummary}
                </div>
              )}
            </div>

            {/* explanation details */}
            <div className="text-sm sm:text-base text-gray-900" style={{ maxHeight: 400, overflowY: 'auto' }}>
              {data.explanation}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
