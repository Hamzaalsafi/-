import React, { useEffect,useState } from 'react'
import {MorphingBubble} from './MorphingBubble'
import { motion } from "framer-motion";
import supabase from './supabaseClient';
export function Home({scrollToForm}) {
const [subtimes,setSubTimes]=useState(0);
const [totalSubmissionCount, setTotalSubmissionCount] = useState(0);
const [uniqueCourseCount, setUniqueCourseCount] = useState(0);
useEffect(() => {
  const countStudents = async () => {
    try {
     
      const { count, error } = await supabase
        .from('student') 
        .select('student_id', { count: 'exact' }); 

      if (error) {
        throw error;
      } else {
        setSubTimes(count);  
      }
    } catch (err) {
      console.error('Error counting students:', err.message);
    }
  };countStudents(); 
}, []); 
useEffect(() => {
  const countTotalSubmissions = async () => {
    try {


      const { data, error } = await supabase
        .from('student')  
        .select('submission_count');

      if (error) {
        throw error;
      } else {
   
        const total = data.reduce((acc, row) => acc + (row.submission_count || 0), 0);
        setTotalSubmissionCount(total);  
      }
    } catch (err) {
      console.error('Error counting total submissions:', err.message);
    } finally {
     
    }
  };

  countTotalSubmissions();
}, []);
useEffect(() => {
  const countUniqueCourses = async () => {
    try {
   

   
      const { data, error } = await supabase
        .from('submission')
        .select('course')
        .neq('course', null);  

      if (error) {
        throw error;
      } else {
        const uniqueCourses = [...new Set(data.map(item => item.course))];
        setUniqueCourseCount(uniqueCourses.length);  
      }
    } catch (err) {
      console.error('Error counting unique courses:', err.message);
    } finally {
   
    }
  };

  countUniqueCourses();
}, []);

  
  
  return (
    <div className='w-screen h-screen flex items-center  flex-col-reverse lg:flex-row lg:justify-between  bg-slate-50 '>
    
        <div className=' flex lg:justify-center flex-col px-1 lg:px-0   items-center w-[100%] md:h[40%] h-[60%]  lg:w-[42%]  lg:h-[100%] '>
            <h1 className='font-bold text-center select-none pointer-events-none text-3xl lg:text-4xl text-slate my-4 lg:mb-7 '>
                كن جزء من صدقتنا الجارية 
            </h1>
            <p className='lg:text-2xl text-xl select-none pointer-events-none font-bold text-center text-wrap px-4 lg:px-10 lg:mb-5'>
            قال رسول الله ﷺ : إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية، أو <span className='text-indigo-600 text-[1.1em] '>علم ينتفع به</span>، أو ولد صالح يدعو له
            </p>
        
            <div className='grid grid-cols-3 mb-2 lg:my-4 gap-5 px-4 lg-0 lg:gap-8 mt-5 lg:mt-5'>
                <motion.div className='flex cursor-pointer  flex-col items-center justify-start donation bg-slate-100 lg:py-2.5 p-1 pt-2  lg:pt-3.5 lg:p-1.5 rounded-xl '
                       whileHover={{
                        scale: 1.05, 
                        rotate: 2, 
                      
                      }}
                      whileTap={{
                        scale: 0.95, 
                        rotate: -2, 
                       
                      }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                      }}
                >
                    <div className='bg-slate-700 rounded-2xl p-1.5 select-none pointer-events-none text-gray-100'>
                   <img className='lg:w-[60px] w-[45px]' src="/png_grkc6.png" />   
                   </div>
            
                   <p className='lg:mt-1 justify-start text-lg lg:text-xl  text-center select-none pointer-events-none font-bold'>{subtimes}</p>
                   <p className='select-none text-center  pointer-events-none text-lg lg:text-xl'>مشاركون العطاء</p>
             
                </motion.div>
                <motion.div className='flex cursor-pointer  flex-col items-center justify-start donation bg-slate-100  lg:py-2.5 p-1 pt-2  lg:pt-3.5 lg:p-1.5 rounded-xl '
                  whileHover={{
                    scale: 1.05, 
                    rotate: 2, 
                  
                  }}
                  whileTap={{
                    scale: 0.95, 
                    rotate: -2, 
                   
                  }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                  }}
                
                >
                    <div className='bg-slate-700 cursor-pointer select-none pointer-events-none rounded-2xl p-1.5 text-gray-100'>
                   <img className='lg:w-[60px] w-[45px]' src="/png_m8pbv.png" />   
                   </div>
            
                   <p className='lg:mt-1 text-center  select-none pointer-events-none text-lg lg:text-xl font-bold'>{totalSubmissionCount}</p>
                   <p className='text-lg lg:text-xl text-center   select-none pointer-events-none'> مرات العطاء</p>
             
                </motion.div>
                <motion.div  className='flex cursor-pointer  flex-col items-center justify-start donation bg-slate-100 lg:py-2.5 p-1 pt-2  lg:pt-3.5 lg:p-1.5 rounded-xl ' 
                 whileHover={{
                    scale: 1.05, 
                    rotate: 2, 
                  
                  }}
                  whileTap={{
                    scale: 0.95, 
                    rotate: -2, 
                   
                  }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                    <div className='bg-slate-700 select-none pointer-events-none rounded-2xl p-1.5 text-gray-100'>
                   <img className='lg:w-[60px] w-[45px] ' src="/png_4qdzl.png" />   
                   </div>
            
                   <p className='lg:mt-1 text-center  select-none pointer-events-none text-lg lg:text-xl font-bold'>{uniqueCourseCount}</p>
                   <p className=' text-lg lg:text-xl text-center  select-none pointer-events-none'>المواد المغطاة</p>
             
                </motion.div>
               
            </div>
            <div className='flex justify-center mt-1 lg:mt-8'>
                <button onClick={scrollToForm}  className='font-bold hover:scale-105 lg:px-7 text-xl sm:text-2xl select-none  bg-indigo-600 shadow-lg cursor-pointer  text-white  rounded-lg p-3 py-1 lg:py-2 hover:bg-indigo-700'>شاركنا العطاء</button>
                </div>
        </div>
     
        <div className=' flex justify-center rounded-lr-full rounded-br-full lg:rounded-lr-none  lg:rounded-br-sm lg:rounded-tr-sm   lg:rounded-l-full lg:rounded-t-full shadow-xl rounded-b-full  lg:items-center w-[100%]  lg:w-[60%] h-[40%] sm:h[60%] lg:h-[100%] bg-slate-600 '>
         
      <MorphingBubble/>
     
     
</div>

    </div>
  )
}
