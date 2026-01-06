import { useRef, useState } from 'react';
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
  {
    image: icon1,
    
  },

   {
    image: icon2,
    
  },
   {
    image: icon3,
    
  },
   {
    image: icon4,
    
  },
   {
    image: icon5,
    
  },
   {
    image: icon6,
    
  },
   {
    image: icon7,
    
  },
   {
    image: icon8,
    
  },
   {
    image: icon9,
    
  },
   {
    image: icon10,
    
  },
   {
    image: icon11,
    
  },
   {
    image: icon12,
    
  },
   {
    image: icon13,
    
  },
   {
    image: icon14,
    
  },
];

const Services3Section = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  return (
    <section 
      id="nursing-home" 
      className="mt-[-70px] pb-[200px] pt-[80px] bg-white relative mb-[-60px] rounded-b-[40px] md:rounded-b-[70px]" 
  
    >
      <div className="mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16  pt-[30px]">
          <h2 className="text-5xl md:text-7xl font-medium text-[#387C6B] mb-4" style={{lineHeight: '1.2'}}>
            ที่ปรึกษาครบวงจรสำหรับ <br />
            เนอร์สซิ่งโฮมและศูนย์ดูแลผู้สูงอายุ
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-[95%] mx-auto">
          {/* Partners Carousel */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth px-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-36 text-center group ml-20"
              >
                {/* Logo Container */}
           
                  <div className="w-full aspect-square flex items-center justify-center">
                    <img 
                      src={partner.image} 
                      alt={partner.image}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
              
                
           
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#387C6B] rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Services3Section;