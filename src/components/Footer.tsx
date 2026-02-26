import { useRef, useEffect } from 'react';
import icon1 from '@/assets/icon-nurse-1.png';
import icon2 from '@/assets/icon-nurse-2.png';
import icon3 from '@/assets/icon-nurse-3.png';
import icon4 from '@/assets/icon-nurse-4.png';
import icon5 from '@/assets/icon-nurse-5.png';
import icon6 from '@/assets/icon-nurse-6.png';
import icon7 from '@/assets/icon-nurse-7.png';
import icon8 from '@/assets/icon-nurse-8.png';
import icon9 from '@/assets/icon-nurse-9.png';
import icon10 from '@/assets/icon-nurse-10.png';
import icon11 from '@/assets/icon-nurse-11.png';
import icon12 from '@/assets/icon-nurse-12.png';
import icon13 from '@/assets/icon-nurse-13.png';
import icon14 from '@/assets/icon-nurse-14.png';

const partners = [
  { image: icon1 }, { image: icon2 }, { image: icon3 }, { image: icon4 },
  { image: icon5 }, { image: icon6 }, { image: icon7 }, { image: icon8 },
  { image: icon9 }, { image: icon10 }, { image: icon11 }, { image: icon12 },
  { image: icon13 }, { image: icon14 },
];

const Footer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const isHovering = useRef(false);

  const startScroll = () => {
    const scroll = () => {
      if (!scrollRef.current || !isHovering.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // ถึงท้ายแล้ว กลับไปต้น
      if (scrollLeft + clientWidth >= scrollWidth) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollLeft += 1.5;
      }
      animRef.current = requestAnimationFrame(scroll);
    };
    animRef.current = requestAnimationFrame(scroll);
  };

  const stopScroll = () => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopScroll(); // cleanup on unmount
  }, []);

  return (
    <footer
      className=""
      style={{ borderTopLeftRadius: "70px", borderTopRightRadius: "70px" }}
    >
      <div className="px-4 sm:px-6 bg-[#387C6B] py-8 sm:py-12">
        <div className="mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 pt-[30px]">
            <h2 className="text-xl md:text-3xl text-[#fff] mb-4" style={{ lineHeight: '1.2' }}>
              ที่ปรึกษาครบวงจรสำหรับเนอร์สซิ่งโฮมและศูนย์ดูแลผู้สูงอายุ
            </h2>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-[95%] mx-auto">
            <div
              ref={scrollRef}
              onMouseEnter={() => {
                isHovering.current = true;
                startScroll();
              }}
              onMouseLeave={() => {
                isHovering.current = false;
                stopScroll();
              }}
              className="flex gap-6 overflow-x-auto pb-8 scroll-smooth px-4 cursor-pointer"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {partners.map((partner, index) => (
                <div key={index} className="flex-shrink-0 w-36 text-center group ml-20">
                  <div className="w-full aspect-square flex items-center justify-center">
                    <img
                      src={partner.image}
                      alt={`partner-${index + 1}`}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[28px] sm:h-[38px] bg-[#EBB108]"></div>
    </footer>
  );
};

export default Footer;