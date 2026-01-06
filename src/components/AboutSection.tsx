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
            เราเป็นทีมกายภาพบำบัดที่เชื่อว่า "การฟื้นฟูที่ดี ไม่จำเป็นต้องเริ่มที่คลินิก" บริการของเราจึงเน้นการ ดูแลถึงบ้าน
            เพื่อให้คุณได้พักผ่อนและฟื้นตัวในสภาพแวดล้อมที่คุ้นเคย นำทีมโดย ร้อยา พงศ์ทิพย์ นักกายภาพบำบัด จบจากคณะกายภาพบำบัด มหาวิทยาลัยมหิดล
            มีประสบการณ์ดูแลผู้ป่วยกว่า 500 ราย ทั้งผู้สูงอายุและวัยทำงาน เชี่ยวชาญด้าน กล้ามเนื้อ กระดูกสันหลัง และออฟฟิศซินโดรม
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
