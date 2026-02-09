import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import teamMember1 from '@/assets/team-1.png';
import teamMember9 from '@/assets/team-9.png';
import teamMember2 from '@/assets/team-2.png';
import teamMember3 from '@/assets/team-3.png';
import teamMember4 from '@/assets/team-4.png';
import teamMember5 from '@/assets/team-5.png';
import teamMember6 from '@/assets/team-6.png';
import teamMember7 from '@/assets/team-7.png';
import teamMember8 from '@/assets/team-8.png';

const teamMembers = [
  {
    image: teamMember1,
    name: 'อัครนันท์ โกวิทยเจริญวัฒน์',
    title: 'กายภาพบำบัดอาวุโส',
    license: 'ก.111111'
  },
  {
    image: teamMember9,
    name: 'ธรรมธรร เตชะพิสิษฐ์',
    title: 'นักกายภาพ',
    license: 'ก.13529'
  },
  {
    image: teamMember2,
    name: 'ธีรเดช ศรีวิเศษ',
    title: 'นักกายภาพ',
    license: 'ก.17023'
  },
  {
    image: teamMember3,
    name: 'ชุษณธร เลาหรัตนวิเศษ',
    title: 'นักกายภาพ',
    license: 'ก.17027'
  },
  {
    image: teamMember4,
    name: 'อัครนันท์ โกวิทเจริญวัฒน์',
    title: 'นักกายภาพ',
    license: 'ก.13963'
  },
  {
    image: teamMember5,
    name: 'วินิตตา  ตรวจมรรคา',
    title: 'นักกายภาพ',
    license: 'ก.0000'
  },
  {
    image: teamMember6,
    name: 'สุพิชชา วงศ์ผาสุกสถาพร',
    title: 'นักกายภาพ',
    license: 'ก.0000'
  },
  {
    image: teamMember7,
    name: 'ฐิติยา วิบูลธิติ',
    title: 'นักกายภาพ',
    license: 'ก.0000'
  },
  {
    image: teamMember8,
    name: 'สุนิทรา มงคลวัร์',
    title: 'นักกายภาพ',
    license: 'ก.16102'
  },
];

const TeamSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef<number>();

  // Duplicate รายการสมาชิกทีมเพื่อสร้าง infinite loop
  const duplicatedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      if (isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 1;

        // คำนวณความกว้างของรายการต้นฉบับ (1 ชุด)
        const itemWidth = scrollContainer.scrollWidth / 3;
        
        // ถ้าเลื่อนผ่านชุดที่ 1 แล้ว ให้กลับไปจุดเริ่มต้น
        if (scrollContainer.scrollLeft >= itemWidth) {
          scrollContainer.scrollLeft = 0;
        }

        animationFrameRef.current = requestAnimationFrame(autoScroll);
      }
    };

    if (isHovered) {
      animationFrameRef.current = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      className="pt-20 pb-10 bg-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[100%] mx-auto px-6">
        {/* Team Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide scroll-smooth px-8"
        >
          {duplicatedMembers.map((member, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-80 text-center group pb-5"
              style={{boxShadow: '34.85px 29.63px 48.34px 0px rgba(51, 102, 255, 0.05)', borderRadius: '20px'}}
            >
              {/* Photo Container */}
              <div className="relative mb-6 overflow-hidden">
                <div className="w-full h-100 bg-white overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* License Badge */}
              <div className="inline-block bg-[#EBB108] text-white px-8 py-1 rounded-full text-lg font-medium mb-4">
                {member.license}
              </div>
              
              {/* Name & Title */}
              <h3 className="font-medium text-[#545454] text-xl mb-1">
                {member.name}
              </h3>
              <p className="text-[#545454] text-md">
                {member.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;