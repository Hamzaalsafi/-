
import './App.css';
import {Home} from './Home'
import {Nav} from './Nav'
import {Form} from './Form'
import {DonationCount} from './DonationCount'
import {AboutUs} from './AboutUs'
function App() {
  
  return (
    <div className="overflow-x-hidden ">
    
    <Nav/>
     <Home/>
     <DonationCount/>
     <Form/>
     <AboutUs/>
    </div>
  );
}

export default App;
