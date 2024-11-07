import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF , faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const AboutUs = () => {
   
  return (
    <div className='relative overflow-hidden w-screen body h-screen px-10 flex flex-col justify-center items-center bg-gray-100'>
<div className="meteor-1"></div>
<div className="meteor-2"></div>
<div className="meteor-3"></div>


<h1 className='sm:w-1/2 z-50 text-gray-200 text-2xl text-center'>يهدف هذا الموقع إلى بناء منصة شاملة تحتوي على جميع المصادر التي يحتاجها  الطالب الجامعي. يعتمد نجاح هذا المشروع على جهودكم، حيث أن جمع المصادر لمختلف التخصصات يتطلب تعاون كبير.

تعد هذه الخطوة الأولى  وهي تجميع بيانات شاملة لمصادر المواد الدراسية بدايةً من كلية الحجاوي ومستقبلًا إلى باقي الجامعة. دعمكم أساسي لنجاح هذه الفكرة، فكل مساهمة تُحدث فرقًا في بناء صدقة جارية تستمر لسنوات
</h1>

<footer className='absolute flex flex-col justify-center items-center w-1/2 bottom-0 m-2 p-2'>
      <div className="flex justify-center space-x-4">
   
        <a
          className="social-button flex justify-center items-center rounded-full w-12 h-12 text-white bg-blue-600 hover:bg-blue-700 transition"
          href="https://www.facebook.com/profile.php?id=100069904639708&mibextid=kFxxJD"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        
   
        <a
          className="social-button flex justify-center items-center rounded-full w-12 h-12 text-white bg-blue-700 hover:bg-blue-800 transition"
          href="
https://www.linkedin.com/in/hamza-alsafi-b52401272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        
      
      </div>
      <div className="text-center mt-4 text-gray-400">تم تطوير هذا الموقع بواسطة:حمزة الصافي</div>
    </footer>
    </div>
    
  );
};

