import { useState } from 'react';
import Earth from './earth';
import Typewriter from "./typewriter";
import Musicplayer from "./musicplayer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home({ onEnter }) {
  const [unlocked, setUnlocked] = useState(false);
  const [showButton, setShowButton] = useState(false);

  function handleUnlock() {
    setUnlocked(true);
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* click to start animation */}
      {!unlocked && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-5 sm:mb-7 md:mb-10 lg:mb-19 tracking-wide  [text-shadow:0_0_40px_#00e6ff]" >
              Click to start your journey
            </div>
            <button
              onClick={handleUnlock}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-7 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-2xl mb-5 shadow-1xl transition shadow-[0_0_25px_#00e6ff]"
            >
              Enter
            </button>
            <div className="text-white text-base sm:text-lg font-mono opacity-70 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
              &copy; 2025 Yuxin Jiang
            </div>
          </motion.div>
        </div>
      )}

      {/* after clicking start journey*/}
      {unlocked && (
        <>
          <Earth />
          <Musicplayer src="/music/bgm.mp3" />

          {/* type writer animation */}
          <div
            className="z-10 absolute top-[12vh] sm:top-1/4 left-1/2 transform -translate-x-1/2 w-full flex justify-center px-3 max-w-3xl"
          >
            <Typewriter onDone={() => setShowButton(true)} />
          </div>

          {/* key photo animation */}
          <AnimatePresence>
            {showButton && (
              <div
                className="absolute w-full flex justify-center bottom-[14vh] z-20 pointer-events-auto"
                style={{ pointerEvents: showButton ? "auto" : "none" }}
              >
                <motion.img
                  animate={{
                    opacity: 1,
                    y: [0, 3, -3,0],  
                    scale: 1
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  src="/assets/key.png"
                  alt="Key"
                  className="max-w-[90px] cursor-pointer"
                  onClick={onEnter}
                />
              </div>
            )}
          </AnimatePresence>



        </>
      )}
    </div>
  );
}
