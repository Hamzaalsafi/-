
import './App.css';
import {Home} from './Home'
import {Nav} from './Nav'
import {Form} from './Form'
import {DonationCount} from './DonationCount'
import {AboutUs} from './AboutUs'
import {Start} from './Start'
import { useStudent } from './StudentContext'; 
import { useRef } from 'react';
import { Analytics } from "@vercel/analytics/react"
function App() {
  const homeRef = useRef(null);
  const donationRef = useRef(null);
  const formRef = useRef(null);
  const aboutUsRef = useRef(null);
  const { student } = useStudent();
  const scrollToHome = () => homeRef.current.scrollIntoView({ behavior: 'smooth' });
  const scrollToDonation = () => donationRef.current.scrollIntoView({ behavior: 'smooth' });
  const scrollToForm = () => formRef.current.scrollIntoView({ behavior: 'smooth' });
  const scrollToAboutUs = () => aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
  return (

  <div className="overflow-x-hidden">
      {student === "none" && <Start />}

      {student !== "none" && (
        <>
          <Nav 
            scrollToHome={scrollToHome} 
            scrollToDonation={scrollToDonation} 
            scrollToForm={scrollToForm} 
            scrollToAboutUs={scrollToAboutUs} 
          />
          <section ref={homeRef}><Home     scrollToForm={scrollToForm}   /></section>
          {student === "student" && (
            <section ref={donationRef}><DonationCount  scrollToHome={scrollToHome} 
            scrollToDonation={scrollToDonation} 
            scrollToForm={scrollToForm} 
            scrollToAboutUs={scrollToAboutUs}  /></section>
          )}
          <section ref={formRef}><Form   scrollToHome={scrollToHome} 
            scrollToDonation={scrollToDonation} 
            scrollToForm={scrollToForm} 
            scrollToAboutUs={scrollToAboutUs}  /></section>
          <section ref={aboutUsRef}><AboutUs /></section>
        </>
      )}
    </div>
  );
}

export default App;
