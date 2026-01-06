import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import teamMember1 from '@/assets/team-member-1.jpg';
import teamMember2 from '@/assets/team-member-2.jpg';
import teamMember3 from '@/assets/team-member-3.jpg';
import teamMember4 from '@/assets/team-member-4.jpg';
import teamMember5 from '@/assets/team-member-5.jpg';

const teamMembers = [
  {
    image: teamMember1,
    name: 'อัครนันท์ โกวิทยเจริญวัฒน์',
    title: 'กายภาพบำบัดอาวุโส',
    license: 'ก.111111'
  },
  {
    image: teamMember2,
    name: 'ธรรมธรร เตชะพิสิษฐ์',
    title: 'นักกายภาพ',
    license: 'ก.13529'
  },
  {
    image: teamMember3,
    name: 'ธีรเดช ศรีวิเศษ',
    title: 'นักกายภาพ',
    license: 'ก.17023'
  },
  {
    image: teamMember4,
    name: 'ชุษณธร เลาหรัตนวิเศษ',
    title: 'นักกายภาพ',
    license: 'ก.17027'
  },
  {
    image: teamMember5,
    name: 'อัครนันท์ โกวิ',
    title: 'นักกายภาพ',
    license: 'ก.13'
  }
];

const TeamSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="py-20 bg-card relative">
      <div className="container mx-auto px-6">
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card shadow-lg rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-forest" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card shadow-lg rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-forest" />
        </button>

        {/* Team Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide scroll-smooth px-8"
        >
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-64 text-center group"
            >
              {/* Photo Container */}
              <div className="relative mb-6 overflow-hidden">
                <div className="w-full h-80 bg-muted overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* License Badge */}
              <div className="inline-block bg-amber-400 text-forest-dark px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-md">
                {member.license}
              </div>
              
              {/* Name & Title */}
              <h3 className="font-semibold text-forest text-lg mb-1">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm">
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
