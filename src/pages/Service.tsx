import Navbar from '@/components/Navbar';


import Service1Section from '@/components/Service1';
import Service2Section from '@/components/Service2';
import Service3Section from '@/components/Service3';

import Footer from '@/components/Footer2';

const Index = () => {
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
