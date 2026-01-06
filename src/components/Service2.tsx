import { Activity, ArrowRight, Phone, FileText, Users, Truck, GraduationCap } from 'lucide-react';

// ใช้ placeholder images เนื่องจากไม่มี assets จริง
const services = [
  {
    icon: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    title: 'คลินิกกายภาพบำบัด',
    description: 'รักษาบำบัดฟื้นฟูทางกายภาพบำบัด ทั้งกระดูกและกล้ามเนื้อ ระบบประสาทและสมอง',
    link: '#',
    iconBg: 'bg-[#00937933]',
    iconColor: 'text-coral'
  },
  {
    icon: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    title: 'กายภาพบำบัดนอกสถานที่',
    description: 'รักษาฟื้นฟู ที่บ้าน คลินิก เนอร์สซิ่งโฮม ศูนย์ดูแลผู้สูงอายุ',
    link: '#',
    iconBg: 'bg-[#FF625033]',
    iconColor: 'text-coral'
  },
  {
    icon: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop',
    title: 'ที่ปรึกษาครบวงจรสำหรับ เนอร์สซิ่งโฮมและศูนย์ดูแลผู้สูงอายุ',
    description: 'ให้คำปรึกษาครบวงจร สหวิชาชีพ ทั้งการจัดตั้งคลินิก การรักษา การตลาด',
    link: '#',
    iconBg: 'bg-[#00937933]',
    iconColor: 'text-forest'
  },
  {
    icon: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    title: 'สหวิชาชีพ',
    description: 'กิจกรรมบำบัด แก้ไขการพูด',
    link: null,
    iconBg: 'bg-[#00937933]',
    iconColor: 'text-coral'
  },
  {
    icon: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop',
    title: 'รับส่งผู้สูงอายุ',
    description: 'ดูแล รับ ส่ง ตลอดการเดินทางพบหมอ และส่งกลับบ้าน รวมการส่งการส่งเอกสาร รับยาแทน',
    link: null,
    iconBg: 'bg-[#FF625033]',
    iconColor: 'text-forest'
  },
  {
    icon: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    title: 'อบรมความรู้สุขภาพ กายภาพบำบัด',
    description: 'จัดอบรมความรู้ให้กับบริษัท จัดกิจกรรม สอนผู้ดูแลผู้สูงอายุ',
    link: null,
    iconBg: 'bg-[#00937933]',
    iconColor: 'text-forest'
  }
];

const Services2Section = () => {
  return (
    <section id="services" className="mt-[-70px] pb-20 pt-[80px] bg-white pt-[200px]" style={{ borderTopLeftRadius: "70px", borderTopRightRadius: "70px" }}>
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
                alt={service.title} 
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