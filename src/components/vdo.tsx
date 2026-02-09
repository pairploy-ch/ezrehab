import React, { useRef, useEffect } from 'react';
import vdo02 from '../assets/vdo/vdo.mp4';

const VDO = () => {
  const videoRef = useRef(null);


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    }
  }, []);

  return (
    <div className="relative w-full bg-[#387C6B] flex items-center justify-center overflow-hidden pb-20">
      {/* Video Container */}
      <div className="relative w-full max-w-6xl  rounded-lg overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          src={vdo02}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default VDO;