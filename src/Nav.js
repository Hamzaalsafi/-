import React from 'react'
import { useStudent } from './StudentContext'; 
export function Nav({ scrollToHome, scrollToDonation, scrollToForm, scrollToAboutUs }) {
  const {student }=useStudent();
 

  return (
    <nav className=' absolute w-full h-fit sm:h-12 z-50 '>
      <ul className='flex p sm:text-xl text-white font-medium font relative flex-row-reverse px-2 sm:px-7 items-center  sm:justify-start py-1.5 sm:py-2 justify-center gap-5 sm:gap-8'>
        <li onClick={scrollToForm} className=' cursor-pointer hover:scale-105 sm:px-6 px-2 bg-indigo-600 text-white shadow-lg  rounded-lg sm:py-1.5 py-1 hover:bg-indigo-700 text-center' >شاركنا العطاء</li>
       {student==="student"&&( <li onClick={scrollToDonation} className=' cursor-pointer hover:scale-110 hover:text-gray-200' >مشاركون العطاء</li>)}
        <li onClick={scrollToHome} className=' cursor-pointer hover:scale-110 hover:text-gray-200'>الرئيسية</li>
        <li onClick={scrollToAboutUs} className=' cursor-pointer hover:scale-110 hover:text-gray-200'>هدفنا</li>
      </ul>
    </nav>
  )
}

