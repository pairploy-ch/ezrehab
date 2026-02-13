import {
  Activity,
  ArrowRight,
  Phone,
  FileText,
  Users,
  Truck,
  GraduationCap,
} from "lucide-react";
import icon1 from "@/assets/icon-service-1.png";
import icon2 from "@/assets/icon-home.png";
import icon3 from "@/assets/icon-service-3.png";
import icon4 from "@/assets/icon-circle.png";
import icon5 from "@/assets/icon-service-5.png";
import icon6 from "@/assets/icon-service-6.png";
import icon7 from "@/assets/icon-service-7.png";
import icon8 from "@/assets/icon-service-8.png";
import vdo01 from "@/assets/vdo/01.mp4";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ServicesSection.css";
import VDO from '@/components/vdo';


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

const services = [
  {
    icon: icon1,
    title: "คลินิกกายภาพบำบัด",
    description:
      "รักษาบำบัดฟื้นฟูทางกายภาพบำบัด ทั้งกระดูกและกล้ามเนื้อ ระบบประสาทและสมอง",
    link: "/service/#clinic",
    iconBg: "bg-[#00937933]",
    iconColor: "text-coral",
  },
  {
    icon: icon2,
    title: "กายภาพบำบัดนอกสถานที่",
    description: "รักษาฟื้นฟู ที่บ้าน คลินิก เนอร์สซิ่งโฮม ศูนย์ดูแลผู้สูงอายุ",
    link: "/service/#on-site-therapys",
    iconBg: "bg-[#00937933]",
    iconColor: "text-coral",
  },
  {
    icon: icon3,
    title: "ที่ปรึกษาครบวงจรสำหรับ เนอร์สซิ่งโฮมและศูนย์ดูแลผู้สูงอายุ",
    description:
      "ให้คำปรึกษาครบวงจร สหวิชาชีพ ทั้งการจัดตั้งคลินิก การรักษา การตลาด",
    link: "/service/#nursing-home",
    iconBg: "bg-[#00937933]",
    iconColor: "text-forest",
  },
  {
    icon: icon4,
    title: "สหวิชาชีพ",
    description: "กิจกรรมบำบัด แก้ไขการพูด ฝึกกลืน แพทย์แผนไทยและแผนจีน",
    link: null,

    iconBg: "bg-[#00937933]",
    iconColor: "text-coral",
  },
  {
    icon: icon5,
    title: "รับส่งผู้สูงอายุ",
    description:
      "ดูแล รับ ส่ง ตลอดการเดินทางพบหมอ และส่งกลับบ้าน รวมการส่งการส่งเอกสาร รับยาแทน",
    link: null,
    iconBg: "bg-[#00937933]",
    iconColor: "text-forest",
  },
  {
    icon: icon6,
    title: "อบรมความรู้สุขภาพ กายภาพบำบัด",
    description: "จัดอบรมความรู้ให้กับบริษัท จัดกิจกรรม สอนผู้ดูแลผู้สูงอายุ",
    link: null,
    iconBg: "bg-[#00937933]",
    iconColor: "text-forest",
  },
    {
    icon: icon7,
    title: "ดูแลผู้สูงอายุที่บ้าน",
    description: "โดย พยาบาล ผู้ช่วยพยาบาล",
    link: null,
    iconBg: "bg-[#00937933]",
    iconColor: "text-forest",
  },
      {
    icon: icon8,
    title: "เนอร์ซิ่งโฮม ศูนย์ดูแลผู้สูงอายุ ",
    description: "ศูนย์ดูแลผู้สูงอายุผู้ป่วย แบบรายวันรายเดือน",
    link: null,
    iconBg: "bg-[#00937933]",
    iconColor: "text-forest",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-20 bg-[#387C6B] -mt-32 relative z-20 rounded-t-[40px] md:rounded-t-[70px]"
    >
<VDO />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 mt-12">
          <h2 className="text-4xl md:text-5xl font-medium text-primary-foreground mb-4">
            บริการของเรา
          </h2>
       
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto ">
          {services.map((service, index) => (
            <div
              key={index}
              className="pt-[50px] bg-card rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${service.iconBg} group-hover:scale-110 transition-transform duration-300`}
              >
                {/* <service.icon className={`w-8 h-8 ${service.iconColor}`} /> */}
                <img src={service.icon} alt={service.icon} className="h-12" />
              </div>
              <h3 className="text-2xl font-medium text-[#2D2D2D] mb-5 leading-tight">
                {service.title}
              </h3>
              <p className="text-[#2D2D2D] text-md mb-4 leading-relaxed mt-4">
                {service.description}
              </p>
              {service.link && (
                <a
                  href={service.link}
                  className="inline-flex items-center text-[#4C84CE] hover:text-teal-light transition-colors text-lg  group/link "
                >
                  <u>ดูรูปเพิ่มเติม</u>
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
