import heroImage from '@/assets/hero-image.jpg';
import logo from '@/assets/logo.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Physical therapy session" 
          className="w-full h-full object-cover"
        />
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-end">
        <div className="max-w-xl animate-slide-in">
          <img src={logo} alt="EZREHAB" className="h-6 mb-4 brightness-0 invert opacity-80" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            เราไม่ใช่แค่รักษา
            <br />
            แต่ช่วยให้คุณกลับมา
            <br />
            ใช้ชีวิตได้เต็มที่อีกครั้ง
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Sem velit viverra amet faucibus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
