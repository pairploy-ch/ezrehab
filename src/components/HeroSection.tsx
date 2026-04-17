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
        className="w-full h-screen sm:h-auto object-cover sm:object-fill block"
      />

      {/* Dark overlay for readability on mobile */}
      <div className="absolute inset-0 bg-black/30 sm:bg-black/10" />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 pb-32 sm:pb-[10%] flex flex-col lg:flex-row items-end justify-between gap-4 sm:gap-6">

          {/* Left Section */}
          <div className="animate-slide-in flex-1 w-full">
            <img
              src={logo}
              alt="EZREHAB"
              className="h-6 sm:h-8 mb-3 sm:mb-6 brightness-0 invert opacity-20"
            />
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white mt-2 sm:mt-4">
              เราไม่ใช่แค่รักษา
            </h1>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white mt-2 sm:mt-4">
              แต่ช่วยให้คุณกลับมา
            </h1>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#55FFD5] mt-2 sm:mt-4">
              ใช้ชีวิตได้เต็มที่อีกครั้ง
            </h1>
            <p className="text-white text-sm sm:text-lg mt-4 sm:mt-8">
              โดยทีมนักกายภาพบำบัดวิชาชีพ
            </p>
          </div>

          {/* Right Section - Contact */}
          <div
            className="bg-white/20 backdrop-blur-lg p-3 sm:p-5 flex flex-row flex-shrink-0 w-full lg:w-auto"
            style={{ borderRadius: "24px", border: "1px solid #BCBCBC" }}
          >
            {/* QR */}
            <div className="flex justify-center items-center mr-3 sm:mr-5 flex-shrink-0">
              <img
                src={qrcode}
                alt="QR Code"
                className="h-[100px] sm:h-[140px] lg:h-[180px]"
              />
            </div>

            {/* Links */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <h3 className="text-lg sm:text-2xl text-white mb-2 sm:mb-3">
                Contact Us
              </h3>

              <div className="space-y-1.5 sm:space-y-2.5">

                <a
                  href="https://youtube.com/@EzRehabกายภาพ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <img src={youtube} alt="YouTube" className="h-4 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">
                    youtube.com/@EzRehabกายภาพ
                  </span>
                </a>

                <a
                  href="tel:0922654744"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <img src={phone} alt="Phone" className="h-4 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">092 265 4744</span>
                </a>

                <a
                  href="https://www.facebook.com/easyrehab/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <img src={fb} alt="Facebook" className="h-4 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">
                    Eazy Rehab กายภาพบำบัดที่บ้าน
                  </span>
                </a>

                <a
                  href="https://maps.app.goo.gl/gNrqH1RrbJnPkCJY8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <img src={location} alt="Location" className="h-5 sm:h-6 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-snug">
                    ซอยติวานนท์ 38 ถนนติวานนท์<br className="hidden sm:block" />
                    {" "}ตำบลบางกระสอ อำเภอเมือง จ.นนทบุรี
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