import heroImage from '@/assets/hero-image.png';
import logo from '@/assets/logo.png';
import qrcode from "@/assets/add-QRCode.png";
import youtube from "@/assets/icon-yt.png";
import fb from "@/assets/icon-fb.png";
import phone from "@/assets/icon-phonee.png";
import tiktok from "@/assets/icon-tiktok.png";
import location from "@/assets/icon-location-1.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Physical therapy session"
        className="w-full h-auto block"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-[90%] mx-auto px-6 pb-[10%] flex flex-col sm:flex-row items-end justify-between gap-6">
          
          {/* Left Section */}
          <div className="animate-slide-in flex-1">
            <img
              src={logo}
              alt="EZREHAB"
              className="h-8 mb-6 brightness-0 invert opacity-20"
            />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mt-4">
              เราไม่ใช่แค่รักษา
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mt-4">
              แต่ช่วยให้คุณกลับมา
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#55FFD5] mt-4">
              ใช้ชีวิตได้เต็มที่อีกครั้ง
            </h1>

            <p className="text-white text-lg mt-8">
              โดยทีมนักกายภาพบำบัดวิชาชีพ
            </p>
          </div>

          {/* Right Section - Contact */}
          <div
            className="bg-white/20 backdrop-blur-lg p-4 sm:p-6 flex flex-col sm:flex-row flex-shrink-0 w-full sm:w-auto"
            style={{ borderRadius: "40px", border: "1px solid #BCBCBC" }}
          >
            
            {/* QR */}
            <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
              <img
                src={qrcode}
                alt="QR Code"
                className="h-[160px] sm:h-[200px]"
              />
            </div>

            {/* Links */}
            <div className="sm:ml-6 flex flex-col justify-between">
              <h3 className="text-2xl sm:text-3xl text-white mb-4 text-center sm:text-left">
                Contact Us
              </h3>

              <div className="space-y-3">

                <a
                  href="https://youtube.com/@EzRehabกายภาพ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <img src={youtube} alt="YouTube" className="h-6" />
                  <span className="text-sm break-all">
                    youtube.com/@EzRehabกายภาพ
                  </span>
                </a>

                <a
                  href="tel:0971241688"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <img src={phone} alt="Phone" className="h-6" />
                  <span className="text-sm">
                    097 124 1688
                  </span>
                </a>

                <a
                  href="https://www.facebook.com/easyrehab/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <img src={fb} alt="Facebook" className="h-6" />
                  <span className="text-sm">
                    Eazy Rehab กายภาพบำบัดที่บ้าน
                  </span>
                </a>

                <a
                  href="https://maps.app.goo.gl/gNrqH1RrbJnPkCJY8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <img src={location} alt="Location" className="h-8" />
                  <span className="text-sm">
                       ซอยติวานนท์ 38 ถนนติวานนท์ <br /> ตำบลบางกระสอ อำเภอเมือง
                    จังหวัด นนทบุรี
                  </span>
                </a>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;