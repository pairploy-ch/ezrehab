import { Activity, ArrowRight, Phone, FileText, Users, Truck, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: Activity,
    title: 'คลินิกกายภาพบำบัด',
    description: 'รักษาบำบัดฟื้นฟูทางกายภาพบำบัด ทั้งกระดูกและกล้ามเนื้อ ระบบประสาทและสมอง',
    link: '#',
    iconBg: 'bg-coral/20',
    iconColor: 'text-coral'
  },
  {
    icon: ArrowRight,
    title: 'กายภาพบำบัดนอกสถานที่',
    description: 'รักษาฟื้นฟู ที่บ้าน คลินิก เนอร์สซิ่งโฮม ศูนย์ดูแลผู้สูงอายุ',
    link: '#',
    iconBg: 'bg-coral/20',
    iconColor: 'text-coral'
  },
  {
    icon: Phone,
    title: 'ที่ปรึกษาครบวงจรสำหรับ เนอร์สซิ่งโฮมและศูนย์ดูแลผู้สูงอายุ',
    description: 'ให้คำปรึกษาครบวงจร สหวิชาชีพ ทั้งการจัดตั้งคลินิก การรักษา การตลาด',
    link: '#',
    iconBg: 'bg-mint',
    iconColor: 'text-forest'
  },
  {
    icon: FileText,
    title: 'สหวิชาชีพ',
    description: 'กิจกรรมบำบัด แก้ไขการพูด',
    link: null,
    iconBg: 'bg-coral/20',
    iconColor: 'text-coral'
  },
  {
    icon: Truck,
    title: 'รับส่งผู้สูงอายุ',
    description: 'ดูแล รับ ส่ง ตลอดการเดินทางพบหมอ และส่งกลับบ้าน รวมการส่งการส่งเอกสาร รับยาแทน',
    link: null,
    iconBg: 'bg-mint',
    iconColor: 'text-forest'
  },
  {
    icon: GraduationCap,
    title: 'อบรมความรู้สุขภาพ กายภาพบำบัด',
    description: 'จัดอบรมความรู้ให้กับบริษัท จัดกิจกรรม สอนผู้ดูแลผู้สูงอายุ',
    link: null,
    iconBg: 'bg-mint',
    iconColor: 'text-forest'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-forest">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary-foreground mb-4 italic">
            บริการของเรา
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-card rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${service.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-8 h-8 ${service.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-forest mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {service.description}
              </p>
              {service.link && (
                <a 
                  href={service.link} 
                  className="inline-flex items-center text-teal hover:text-teal-light transition-colors text-sm font-medium group/link"
                >
                  ดูเพิ่มเติม
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
