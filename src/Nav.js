import React from 'react'
import { useMotionValue, animate } from 'framer-motion';
export function Nav() {

  const scrollDown = () => {
    const targetScrollY = window.innerHeight * 2;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }; 
  const scrollDownToAbout = () => {
    const targetScrollY = window.innerHeight * 3;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }; 
  const scrollToDonation = () => {
    const targetScrollY = window.innerHeight; 
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
};
const scrollHome = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
  return (
    <nav className=' absolute w-full h-fit sm:h-12 z-50 '>
      <ul className='flex p sm:text-xl text-white font-medium font relative flex-row-reverse px-2 sm:px-7 items-center  sm:justify-start py-1.5 sm:py-2 justify-center gap-5 sm:gap-8'>
        <li onClick={scrollDown} className=' cursor-pointer hover:scale-105 sm:px-6 px-2 bg-indigo-600 text-white shadow-lg  rounded-lg sm:py-1.5 py-1 hover:bg-indigo-700 text-center' >شاركنا العطاء</li>
        <li onClick={scrollToDonation} className=' cursor-pointer hover:scale-110 hover:text-gray-200' >مشاركون العطاء</li>
        <li onClick={scrollHome} className=' cursor-pointer hover:scale-110 hover:text-gray-200'>الرئيسية</li>
        <li onClick={scrollDownToAbout} className=' cursor-pointer hover:scale-110 hover:text-gray-200'>هدفنا</li>
      </ul>
    </nav>
  )
}

