import { Activity, ArrowRight, Phone, FileText, Users, Truck, GraduationCap } from 'lucide-react';
import onsite6 from '@/assets/onsite-6.png';
import onsite1 from '@/assets/onsite-1.png';
import onsite2 from '@/assets/onsite-2.png';
import onsite3 from '@/assets/onsite-3.png';
import onsite4 from '@/assets/onsite-4.png';
import onsite5 from '@/assets/onsite-5.png';


const services = [
 
    {
    icon: onsite1,
  },
    {
    icon: onsite2,
  },
    {
    icon: onsite3,
  },
    {
    icon: onsite4,
  },
    {
    icon: onsite5,
  },
   {
    icon: onsite6,
  },

];

const Services2Section = () => {
  return (
    <section id="on-site-therapys" className="mt-[-70px] pb-20 pt-[80px] bg-white pt-[200px] rounded-t-[40px] md:rounded-t-[70px]" >
      <div className="mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-medium text-[#387C6B] mb-4">
            กายภาพบำบัดนอกสถานที่
          </h2>
          <p className="text-[#387C6B] max-w-2xl mx-auto text-xl mt-6">
            รักษาฟื้นฟู ที่บ้าน  คลินิก เนอร์สซิ่งโฮม <br /> ศูนย์ดูแลผู้สูงอายุ
          </p>
        </div>

        {/* Services Grid - 6 Image Gallery Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[90%] mx-auto">
          {services.slice(0, 6).map((service, index) => (
            <div 
              key={index} 
              className="relative aspect-square rounded-3xl overflow-hidden group  hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <img 
                src={service.icon} 
                alt={service.icon} 
                className="w-full h-full object-cover"
              />
              
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services2Section;