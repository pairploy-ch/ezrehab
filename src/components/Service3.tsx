import { useRef, useState } from 'react';

// ใช้ placeholder images เนื่องจากไม่มี assets จริง
const partners = [
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop',
    name: 'บ้านและเรา เนอร์สซิ่งโฮม',
  },
  {
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop',
    name: 'บ้านแสนรัก Healthcare',
  },
  {
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    name: 'Happy Home Senior',
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop',
    name: 'Nont Wellness',
  },
  {
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop',
    name: 'Charn-Chim Recovery',
  },
  {
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    name: 'Senior Care Center',
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop',
    name: 'Elderly Support',
  },
  {
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop',
    name: 'Care Plus',
  }
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
      id="services" 
      className="mt-[-70px] pb-[200px] pt-[80px] bg-white relative mb-[-60px]" 
      style={{ borderBottomLeftRadius: "70px", borderBottomRightRadius: "70px" }}
    >
      <div className="mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16  pt-[30px]">
          <h2 className="text-5xl md:text-8xl font-medium text-[#387C6B] mb-4" style={{lineHeight: '1.2'}}>
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
                className="flex-shrink-0 w-72 text-center group"
              >
                {/* Logo Container */}
           
                  <div className="w-full aspect-square flex items-center justify-center">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
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