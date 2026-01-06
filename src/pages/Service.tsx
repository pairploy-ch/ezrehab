import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Service1Section from '@/components/Service1';
import Service2Section from '@/components/Service2';
import Service3Section from '@/components/Service3';
import Footer from '@/components/Footer2';

const Index = () => {
  useEffect(() => {
    // เช็ค hash จาก URL
    const hash = window.location.hash;
    
    if (hash) {
      // รอให้หน้าโหลดเสร็จก่อน
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          // คำนวณ offset ถ้ามี fixed navbar (ปรับตามความสูง navbar ของคุณ)
          const navbarOffset = 80; // ถ้า navbar ไม่ fixed ให้ใส่ 0
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }

    // Listen for hash changes (สำหรับกรณีที่อยู่ในหน้าเดียวกันแล้วคลิก link อื่น)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          const navbarOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Service1Section />
      <Service2Section />
      <Service3Section />
      <Footer />
    </main>
  );
};

export default Index;