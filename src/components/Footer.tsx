import { MapPin, Phone, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer-section py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Address */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="EZREHAB Logo" className="h-8 brightness-0 invert" />
            </div>
            <h3 className="text-xl font-bold mb-4">EAZYREHUB</h3>
            <p className="text-primary-foreground/70 text-sm">
              69/2 ถนนพหลโยธิน Road, Lat Yao sub-,
              <br />
              Chatuchak, Bangkok 10900
            </p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div className="bg-card p-4 rounded-2xl mb-4">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-xs text-center">QR Code<br/>LINE</span>
              </div>
            </div>
            <button className="bg-teal hover:bg-teal-light text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors">
              <MessageCircle className="w-5 h-5" />
              ADD LINE
            </button>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <MapPin className="w-5 h-5 mt-0.5 text-coral flex-shrink-0" />
                <span className="text-sm">https://maps.app.goo.gl/EHbNstName</span>
              </a>
              <a 
                href="tel:0871041888"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-5 h-5 text-coral flex-shrink-0" />
                <span className="text-sm">087 104 1888</span>
              </a>
              <a 
                href="#"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-coral flex-shrink-0" />
                <span className="text-sm">Easy rehub กายภาพบำบัดใกล้บ้าน</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
