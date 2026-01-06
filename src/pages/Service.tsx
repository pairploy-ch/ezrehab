import Navbar from '@/components/Navbar';


import Service1Section from '@/components/Service1';
import Service2Section from '@/components/Service2';

import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
     
      <Service1Section />
    <Service2Section />
    
      <Footer />
    </main>
  );
};

export default Index;
