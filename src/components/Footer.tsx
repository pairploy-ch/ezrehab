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
      <div className=" px-6 bg-[#387C6B] py-12">
        <div className="flex max-w-[90%] mx-auto" style={{ justifyContent: "space-between" }}>
          {/* Logo & Address */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="mb-4">
              <img
                src={logo}
                alt="EZREHAB Logo"
                className="h-4 brightness-0 invert"
              />
            </div>

            <div>
              <h3 className="text-3xl font-medium text-white mt-4">
                EAZYREHUB
              </h3>
              <p className="text-[#C0C0C0] text-md mt-4">
                00/0 Sukhumwit Road, Sukhumwit , <br />
                Sukhumwit , Bangkok 10101
              </p>
            </div>
          </div>

          {/* QR Code */}
          {/* <div className="flex flex-col items-center">
            <div className="bg-card p-4 rounded-2xl mb-4">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-xs text-center">
                  QR Code
                  <br />
                  LINE
                </span>
              </div>
            </div>
            <button className="bg-teal hover:bg-teal-light text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors">
              <MessageCircle className="w-5 h-5" />
              ADD LINE
            </button>
          </div> */}

          {/* Contact Info */}
          <div
            className="bg-white/20 p-6 flex"
            style={{ borderRadius: "40px", border: "1px solid #BCBCBC" }}
          >
            <div>
               <img src={qrcode} alt="EZREHAB Logo" className="h-[230px]" />
            </div>
            <div className="ml-8" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <h3 className="text-4xl text-white mb-6">Contact Us</h3>
              <div className="space-y-4 mb-2">
                <a
                  href="https://youtube.com/@EzRehabกายภาพ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                   <img src={youtube} alt="EZREHAB Logo" className="h-[30px]" />
                  <span className="text-xl">
                    https://youtube.com/@EzRehabกายภาพ
                  </span>
                </a>
                <a
                  href="tel:0871041888"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <img src={phone} alt="EZREHAB Logo" className="h-[30px]" />
                  <span className="text-xl">097 124 1688</span>
                </a>
                <a
                style={{marginTop: '12px'}}
                  href="#"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                   <img src={fb} alt="EZREHAB Logo" className="h-[35px]" />
                  <span className="text-xl" style={{marginLeft: '-7px'}}>
                    Eazy Rehub กายภาพบำบัดที่บ้าน
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[38px] bg-[#EBB108]">
      
      </div>
    </footer>
  );
};

export default Footer;
