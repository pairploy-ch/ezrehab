import { MapPin, Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import qrcode from '@/assets/add-QRCode.png';
import youtube from '@/assets/icon-yt.png';
import fb from '@/assets/icon-fb.png';
import phone from '@/assets/icon-phonee.png';

const Footer = () => {
  return (
    <footer
      className=""
      style={{ borderTopLeftRadius: "70px", borderTopRightRadius: "70px" }}
    >
      <div className="px-4 sm:px-6 bg-[#387C6B] py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row max-w-[90%] mx-auto gap-8 lg:gap-0" style={{ justifyContent: "space-between" }}>
          {/* Logo & Address */}
          <div
            className="flex flex-col justify-between"
          >
            <div className="mb-4">
              <img
                src={logo}
                alt="EZREHAB Logo"
                className="h-3 sm:h-4 brightness-0 invert"
              />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white mt-2 sm:mt-4">
                EAZYREHUB
              </h3>
              <p className="text-[#C0C0C0] text-sm sm:text-md mt-2 sm:mt-4">
                ซอยติวานนท์ 38 ถนนติวานนท์ <br /> ตำบลบางกระสอ อำเภอเมือง จังหวัด นนทบุรี
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className="bg-white/20 p-4 sm:p-6 flex flex-col sm:flex-row"
            style={{ borderRadius: "40px", border: "1px solid #BCBCBC" }}
          >
            <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
               <img src={qrcode} alt="QR Code" className="h-[180px] sm:h-[230px]" />
            </div>
            <div className="sm:ml-8 flex flex-col justify-between">
              <h3 className="text-2xl sm:text-4xl text-white mb-4 sm:mb-6 text-center sm:text-left">Contact Us</h3>
              <div className="space-y-3 sm:space-y-4 mb-2">
                <a
                  href="https://youtube.com/@EzRehabกายภาพ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                   <img src={youtube} alt="YouTube" className="h-[24px] sm:h-[30px] flex-shrink-0" />
                  <span className="text-sm sm:text-xl break-all">
                    https://youtube.com/@EzRehabกายภาพ
                  </span>
                </a>
                <a
                  href="tel:0971241688"
                  className="flex items-center gap-2 sm:gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <img src={phone} alt="Phone" className="h-[24px] sm:h-[30px] flex-shrink-0" />
                  <span className="text-sm sm:text-xl">097 124 1688</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 sm:gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors mt-3 sm:mt-3"
                >
                   <img src={fb} alt="Facebook" className="h-[28px] sm:h-[35px] flex-shrink-0" />
                  <span className="text-sm sm:text-xl sm:ml-[-7px]">
                    Eazy Rehub กายภาพบำบัดที่บ้าน
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[28px] sm:h-[38px] bg-[#EBB108]">
      
      </div>
    </footer>
  );
};

export default Footer;