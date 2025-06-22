import { useRef, useState, useEffect } from "react";

export default function MusicPlayer({ src = "/music/bgm.mp3" }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);

   //background music volume
    useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;  
    }
  }, []);


  // music autoplay
  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.play().catch(() => {}); 
    }
  }, [playing]);



  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      //loop the music 
      <audio ref={audioRef} src={src} autoPlay loop />

      <button
        onClick={toggleMusic}
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          zIndex: 20,
          background: 'rgba(0, 0, 0, 0)',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        title={playing ? "close music" : "open music"}
      >

        //toggle musicplayer icon
        {playing ? (
          <span role="img" aria-label="sound" style={{ fontSize: 26, color: "#2ec5ff" }}>🔊</span>
        ) : (
          <span role="img" aria-label="mute" style={{ fontSize: 26, color: "#aaa" }}>🔇</span>
        )}

      </button>
    </>
  );
}
