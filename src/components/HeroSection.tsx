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
          <img src={logo} alt="EZREHAB" className="h-8 mb-6 brightness-0 invert opacity-20" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-primary-foreground mt-4">
            เราไม่ใช่แค่รักษา
          
          </h1>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-primary-foreground mt-4">
               แต่ช่วยให้คุณกลับมา
          
          </h1>
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#55FFD5] mt-4">
               ใช้ชีวิตได้เต็มที่อีกครั้ง
          
          </h1>
         
           
            
          <p className="text-white text-lg mt-8">
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
