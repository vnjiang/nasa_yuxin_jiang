import { useRef, useState, useEffect } from "react";

const today = new Date();
const dateString = today.toLocaleDateString("en-UK", {
  year: "numeric",
  month: "long",
  day: "numeric"
});


const story = [
  "Hello, universe traveler",
  "Welcome back to your home planet",
  `It is ${dateString} on Earth`,
  "The key in your hand unlocks countless moments in space",
  "With just a single touch, you can journey through stunning cosmic moments of the past and present",
  "Ready? Click the time key and begin your cosmic adventure!"
];

export default function SciFiTypewriter({ onDone }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const audioRef = useRef(null);


  //audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);


  // play music 
  useEffect(() => {
    if (lineIdx < story.length && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => { });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [lineIdx]);



  //type 1 by 1 animation
  useEffect(() => {
    let typeTimer;
    if (lineIdx < story.length) {
      let curr = 0;
      setDisplayed("");
      setIsTyping(true);

      typeTimer = setInterval(() => {
        setDisplayed(story[lineIdx].slice(0, curr + 1));
        curr++;
        if (curr === story[lineIdx].length) {
          clearInterval(typeTimer);
          setIsTyping(false);
          setTimeout(() => setLineIdx((idx) => idx + 1), 900);
        }
      }, 70);
    } else {
      setIsTyping(false);
      if (onDone) onDone();
    }
    return () => clearInterval(typeTimer);
  }, [lineIdx, onDone]);




  return (
    <div
      className="w-full flex justify-center items-center pt-60 sm:pt-40 md:pt-40 lg:pt-40  "
    >
      <span
        className=" text-center text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-white [text-shadow:0_0_8px_#00e6ff,0_0_24px_#111]
         sm:max-w-2xl md:max-w-2xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-[3000px] "
      >
        {displayed}
        <span
          className="type-cursor  text-[#00e6ff]"
          style={{
            opacity: isTyping ? 1 : 0
          }}
        >
          |
        </span>
      </span>

      {/* typing bg music */}
      <audio ref={audioRef} src="/music/type.mp3" preload="auto" loop />

    </div>

  );
}
