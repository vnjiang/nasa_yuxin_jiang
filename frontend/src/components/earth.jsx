import  { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { motion } from "framer-motion";

export default function Earth() {
  const globeEl = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


  //responsive design for earth
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const globeSize = Math.min(dimensions.width, dimensions.height, 600);



  //earth rotation
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.5;
    }
  }, []);



  return (
    //galaxy background image
    <div
      className="fixed inset-0 w-screen h-screen"
      style={{
        backgroundImage: "url('/galaxy.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        position: "fixed",
        zIndex: 1,
      }}
    >
    

     {/*earth*/}
      <div className="w-full h-full flex items-center justify-center" style={{ pointerEvents: "none" }}>
        {/* rotating earth animation */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}  
          style={{
            width: globeSize,
            height: globeSize,
            maxWidth: "100vw",
            maxHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

        {/* 3d earth */}
          <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundColor="rgba(0,0,0,0)"
            showGraticules={false}
            width={globeSize}
            height={globeSize}
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="white"
            atmosphereAltitude={0.2}
          />
        </motion.div>
      </div>
    </div>
  );
}
