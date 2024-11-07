import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import {Nav} from './Nav'
import supabase from './supabaseClient';
export function DonationCount({ scrollToHome, scrollToDonation, scrollToForm, scrollToAboutUs }) {
  const [isInView, setIsInView] = useState(false);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [page, setPage] = useState(1); // To manage pagination (page 1 initially)
  const [hasMore, setHasMore] = useState(true);
  // Function to handle scroll events
  const handleScroll = () => {
    const triggerPoint = window.innerHeight / 1.5; 
    if (window.scrollY > triggerPoint) {
      setIsInView(true);
    } else {
      setIsInView(false);
    }
  };
  const fetchStudents = async () => {
    if (isLoading || !hasMore) return; 

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('student')
        .select('student_id, full_name, submission_count')
        .order('submission_count', { ascending: false })
        .range((page - 1) * 5, page * 5 - 1); 

      if (error) throw error;

      console.log('Fetched Data:', data); 

      
      setStudents((prevStudents) => {
        const newStudents = [...prevStudents, ...data];
       
        return newStudents.filter((value, index, self) => 
          index === self.findIndex((t) => t.student_id === value.student_id)
        );
      });

     
      if (data.length < 5) {
        setHasMore(false);
      }

      // Increment page number for the next batch
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      console.error('Error fetching students:', err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoadMore = () => {
    fetchStudents();
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, hasMore]); 

 
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div>
    <Nav 
            scrollToHome={scrollToHome} 
            scrollToDonation={scrollToDonation} 
            scrollToForm={scrollToForm} 
            scrollToAboutUs={scrollToAboutUs} 
          />
      <div className='w-screen overflow-x-hidden h-screen flex flex-col  justify-center items-center relative bg-slate-50'>
        <div className='absolute bg-slate-600 right-0 rounded-br-full lg:rounded-br-none rounded-bl-full lg:w-[55%] w-full h-[54px] lg:h-[55px] top-0'></div>

        <div className='absolute bg-slate-600 right-0 rounded-tr-full p-1- lg:rounded-tr-none rounded-tl-full lg:w-[65%] w-full h-[25px] lg:h-[15px] bottom-0'></div>
        <motion.div
          className='w-full h-[80vh] donation max-h-[700px] pb-6 rounded-xl bg-gray-200 max-w-[600px] justify-center items-center flex flex-col'
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }} 
          transition={{ duration: 0.6 }} 
        >
          <div className='w-full h-[40%] rounded-t-xl bg-gradient-to-b from-slate-600 to-gray-600 rounded-bl-[50%] rounded-br-[50%]'>
            <div className='w-full h-full relative flex-shrink-0 px-2 flex justify-center items-start pt-1.5'>
             
              {['bronze', 'crown', 'silver'].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95, rotate: 2 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                  className='w-1/3 cursor-pointer flex flex-col justify-center items-center'
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
             
                >
                  <img src={`/${item}.svg`} className={`w-[30%] h-auto select-none ${index===1?"mt-8":""}`} alt="person" />
                  <img src='/fr.svg' className={` h-auto select-none ${index===1?"w-[40%]":"w-[30%]"}`} alt="person" />
                  <h1 className='text-lg text-gray-100 text-center select-none mt-1'>{students[(index+2)%3] ? students[(index+2)%3].full_name : 'لا يوجد بعد'}</h1>
                  <p className='text-md text-gray-100 text-center select-none'  dir="rtl">مرات العطاء:{students[(index+2)%3] ? students[(index+2)%3].submission_count : 'لا يوجد بعد'} </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className='w-full h-[60%] flex justify-start flex-col items-center'>
            <h1 className='text-2xl font-bold mb-4'>ترتيب مشاركون العطاء</h1>
            <div className='w-full flex relative'>
              <div className='text-lg select-none pl-4 border-0 border-r-2 border-gray-400 pr-1'>التربيب</div>
              <div className='text-center text-lg absolute left-[45%]'> الاسم </div>
              <div className='text-lg select-none text-end ml-auto pr-5 border-0 border-l-2 pl-1 border-gray-400'>مرات العطاء</div>
            </div>
            <div className="w-full ranked mt-1 gap-2 relative overflow-y-auto h-full flex px-3 flex-col justify-start items-start">
      {students.map((student, index) => (
        <motion.div
          key={student.student_id} // Using student_id as a unique key
          className="w-full donation2 px-2 pl-4 rounded-lg py-1 h-fit flex justify-start items-center"
        >
          <h1 className="font-bold text-2xl pr-5">{index + 1}</h1>
          <img
            src="/fr.svg"
            className="w-[7%] select-none bg-slate-500 p-1 rounded-full h-auto"
            alt="person"
          />
          <h1 className="font-bold px-3 text-2xl w-[68%] text-center pr-1">{student.full_name}</h1>
          <p className="text-lg font-bold select-none text-end ml-auto pr-5">{student.submission_count}</p>
        </motion.div>
      ))}

      {/* Button to load more students */}
      {hasMore && !isLoading && (
        <div className='flex justify-center w-full'>
        <button
          onClick={handleLoadMore}
          className="
          font-bold hover:scale-105  text-xl mt-1  select-none  bg-slate-600 hover:bg-slate-700 cursor-pointer  text-white  rounded-lg  p-1 "
        >
          Load More
        </button>
        </div>
      )}

      {isLoading && <p className='text-md w-full text-center text-opacity-45'>جاري التحميل</p>}

      {!hasMore && <p className='text-md w-full  text-center text-opacity-45'>لا يوجد المزيد لتحميله</p>}
    </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

