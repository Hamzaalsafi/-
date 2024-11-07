import React from 'react'
import {useStudent } from './StudentContext'
export function Start() {
    const {student,setStudent}  = useStudent()
    
  return (
    <div    style={{
        backgroundImage:window.innerWidth>1000? 'url("/start.jpg")':'url("/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className='w-screen h-screen flex justify-center items-center start'>
     <div className=' absolute w-screen h-screen bg-black bg-opacity-35 lg:bg-opacity-30'></div> 
  <div className='w-auto max-w-[95%] md:w-[60%] z-50 bg-slate-50 lg:w-1/3 h-fit donation flex-col justify-start rounded-md  items-center p-7 '>
    <h1 className='text-gray-950 font-bold text-4xl text-center' dir="rtl">أهلًا بك أيها المعطاء </h1>
    <p className='text-gray-900 text-2xl py-2 text-center' dir="rtl">هل أنت مدرس أم طالب ؟</p>

    <div  className='w-full flex   justify-start items-center gap-4 lg:gap-6 flex-col  p-2 lg:p-4'>
    <div onClick={()=>{setStudent("dr")}} className="w-[60%] hover:scale-105 hover:bg-blue-300 h-full cursor-pointer   rounded-md px-2 donation text-3xl flex items-center justify-between bg-blue-200">
    <img className='w-[25%]' src="/dean.png" alt="drIcon"/> مدرس 
    <img className='w-[30%]' src="/school.png" alt="drIcon"/>
  </div>

  <div onClick={()=>{setStudent("student")}} className="w-[60%] hover:scale-105 hover:bg-blue-300  h-full cursor-pointer py-0.5 lg:py-1.5 rounded-md px-2 text-3xl donation flex items-center justify-between bg-blue-200">
    <img className='w-[25%]' src="/boy.png" alt="drIcon"/> طالب 
    <img className='w-[25%]' src="/girl.png" alt="drIcon"/>
  </div>
    </div>

  </div>
</div>
  )
}

