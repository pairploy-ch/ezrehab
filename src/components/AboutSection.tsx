const AboutSection = () => {
  return (
    <section id="about" className="pb-20 bg-[#387C6B] rounded-b-[40px] md:rounded-b-[70px]" >
      <div className="container mx-auto px-6">
        {/* Separator Line */}
        <div className="flex justify-center mb-16">
          <div className="w-[40%] h-0.5 bg-primary-foreground/30 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-primary-foreground mb-10 tracking-wider">
            About Us
          </h2>
          <p className="text-white leading-relaxed text-base md:text-lg pb-4 ">
            เราเป็นทีมกายภาพบำบัดและสหวิชาชีพ ที่มุ่งเน้นพร้อมที่จะดูแลและฟื้นฟู รักษา ป้องกัน ทั้งในและนอกสถานที่ <br />
เพื่อให้คุณและครอบครัวกลับมามีชีวิตที่ดีอีกครั้ง  <br />
ประสบการณ์กว่า 1000 ราย เราจะดูแลคุณเสมือนคุณ คือ ครอบครัวของเรา
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
