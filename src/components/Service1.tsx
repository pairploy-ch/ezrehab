import { Activity, ArrowRight, Phone, FileText, Users, Truck, GraduationCap } from 'lucide-react';
import clinic6 from '@/assets/clinic-6.png';
import clinic1 from '@/assets/clinic-1.png';
import clinic2 from '@/assets/clinic-2.png';
import clinic3 from '@/assets/clinic-3.png';
import clinic4 from '@/assets/clinic-4.png';
import clinic5 from '@/assets/clinic-5.png';

const services = [
  {
    icon: clinic6,
  },
    {
    icon: clinic1,
  },
    {
    icon: clinic2,
  },
    {
    icon: clinic3,
  },
    {
    icon: clinic4,
  },
    {
    icon: clinic5,
  },

];

const Services1Section = () => {
  return (
    <section id="clinic" className="pb-20 bg-[#387C6B] pt-[200px] pb-[10rem]">
      <div className="mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-medium text-white mb-4">
            คลินิกกายภาพบำบัด
          </h2>
          <p className="text-white max-w-2xl mx-auto text-xl mt-6">
            รักษาบำบัดฟื้นฟูทางกายภาพบำบัด <br /> ทั้งกระดูกและกล้ามเนื้อ ระบบประสาทและสมอง
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

export default Services1Section;