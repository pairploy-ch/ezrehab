import React, { useState, useRef, useEffect } from 'react';

const VDO = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const videoRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Sample videos - replace with your actual video sources
  const videos = [
    { id: 1, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: 2, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { id: 3, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  ];

  // Initialize: scroll to center video on mount
  useEffect(() => {
    scrollToVideo(activeIndex);
  }, []);

  // Handle video playback based on active index
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  // Handle scroll to determine active video
  const handleScroll = () => {
    if (!scrollContainerRef.current || isDraggingRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const centerPosition = scrollLeft + containerWidth / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const videoLeft = video.offsetLeft;
        const videoWidth = video.offsetWidth;
        const videoCenter = videoLeft + videoWidth / 2;
        const distance = Math.abs(centerPosition - videoCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      }
    });
    
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  // Scroll to specific video
  const scrollToVideo = (index) => {
    if (!scrollContainerRef.current || !videoRefs.current[index]) return;
    
    const container = scrollContainerRef.current;
    const video = videoRefs.current[index];
    const containerWidth = container.offsetWidth;
    const videoLeft = video.offsetLeft;
    const videoWidth = video.offsetWidth;
    
    const scrollPosition = videoLeft - (containerWidth / 2) + (videoWidth / 2);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setActiveIndex(index);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = 'auto';
    }
    handleScroll();
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      handleMouseUp();
    }
  };

  // Touch drag handlers
  const handleTouchStart = (e) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    handleScroll();
  };

  return (
    <div className="w-full mb-16">
      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: 'grab'
        }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="flex-shrink-0 transition-all duration-300"
            style={{
              width: index === activeIndex ? '30%' : '40%',
              maxWidth: index === activeIndex ? '30%' : '40%',
              height: '400px',
            }}
            onClick={() => !isDraggingRef.current && scrollToVideo(index)}
          >
            <div 
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 h-full ${
                index === activeIndex 
                  ? 'shadow-2xl ring-4 ring-white/50' 
                  : 'opacity-60 hover:opacity-80 cursor-pointer'
              }`}
              style={{
                pointerEvents: isDraggingRef.current ? 'none' : 'auto'
              }}
            >
              <video
                ref={el => videoRefs.current[index] = el}
                src={video.src}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ pointerEvents: 'none' }}
              />
              
              {/* Overlay for non-active videos */}
              {index !== activeIndex && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[16px] border-l-gray-800 border-y-[10px] border-y-transparent ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      {/* <div className="flex justify-center gap-2 mt-8">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToVideo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex 
                ? 'w-8 h-3 bg-white' 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div> */}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VDO;