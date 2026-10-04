import './App.css';
import AddEmployee from './AddEmployee';
import GetEmployee from './GetEmployee';
import Aboutus from './Aboutus';
import Services from './Services';
import Contactus from './Contactus';
import AdminDashboard from './AdminDashboard';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Home';
import ShowEmployee from './ShowEmployee';
import EmployeeDashboard from './EmployeeDashboard';
import EmployeeNav from './EmployeeNav';
import AdminNav from './AdminNav';
import RegisterUser from './RegisterUser';
import { useLocation } from 'react-router-dom';
import FirstPage from './FirstPage';
import LeaveApplication from './LeaveApplication';
import CommonNav from './CommonNav';
import UpdateLeaveStatus from './UpdateLeaveStatus';


function App() {

  return (
   <div>
  
    <AppContent/>
    <Routes>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path="/employee" element={<EmployeeDashboard/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/aboutus" element={<Aboutus/>}/>
      <Route path="/contactus" element={<Contactus/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/addemployee" element={<AddEmployee/>}/>
      <Route path="/viewemployee" element={<GetEmployee/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/showemployee" element={<ShowEmployee/>}/>
      <Route path="/registeruser" element={<RegisterUser/>}/>
      <Route path="/" element={<FirstPage/>}/>
      <Route path="/leaveapply" element={<LeaveApplication/>}/>
      <Route path="/updatestatus" element={<UpdateLeaveStatus/>}/>
    </Routes>
    
    
    {/* <LeaveApplication/> */}
    {/* <ShowEmployee/> */}
    {/* <EmployeeNav/> */}
   </div>
  );
}

export default App;

function AppContent(){
  let isloggedin=JSON.parse(localStorage.getItem("isloggedin"))
  let user=JSON.parse(localStorage.getItem("userinfo"))
  let location=useLocation();
  let publicpages=["/","/home","/aboutus","/contactus","/services"]
  return(
    <div>
      {
        (isloggedin && user && location.pathname!=="/registeruser") &&
        (user.role.toLowerCase()==="admin"?<AdminNav/>:<EmployeeNav/>)
      }
      {
        (!isloggedin && !user)&&
        publicpages.includes(location.pathname)? <CommonNav/>:null
      }
    </div>
  )
}
// function Comm(){
//   let isloggedin=JSON.parse(localStorage.getItem("isloggedin"))
//   let user=JSON.parse(localStorage.getItem("userinfo"))
//   let location=useLocation();
//   return(
//     <div>
//      {(!(isloggedin && user) && location.pathname!="/registeruser") && <CommonNav />}
//     </div>
//   )
// }