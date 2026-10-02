
import './App.css';
import AddEmployee from './AddEmployee';
import GetEmployee from './GetEmployee';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Services from './Services';
import Home from './Home';
import AdminDashbord from './AdminDashbord';
import { Route, Routes, useLocation } from 'react-router-dom';
import ShowEmployee from './ShowEmployee';
import EmployeeDashboard from './EmployeeDashboard';
import RegisterUser from './RegisterUser';
import AdminNav from './AdminNav';
import EmpNavbar from './EmpNavbar';
import FirstPage from './FirstPage';
import LeaveApplication from './LeaveApplication';
import CommanNavbar from './CommanNavbar';
import ViewLeaveDetails from './ViewLeaveDetails';
import UpdateLeaveStatus from './UpdateLeaveStatus';


function App() {
  return (
    <div>


      <AppContent></AppContent>

      <Routes>
        <Route path="/home" element={<Home></Home>} />
        <Route path="/aboutus" element={<AboutUs></AboutUs>} />
        <Route path="/contactus" element={<ContactUs></ContactUs>} />
        <Route path="/services" element={<Services></Services>} />
        <Route path="/viewemp" element={<GetEmployee></GetEmployee>} />
        <Route path="/addemp" element={<AddEmployee></AddEmployee>} />
        <Route path="/admindashboard" element={<AdminDashbord></AdminDashbord>} />
        <Route path="/showEmployee" element={<ShowEmployee></ShowEmployee>} />
        <Route path="/employeeDashboard" element={<EmployeeDashboard></EmployeeDashboard>} />
        <Route path="/registeruser" element={<RegisterUser></RegisterUser>}></Route>
        <Route path="/" element={<FirstPage></FirstPage>}></Route>
        <Route path="/leaveaplication" element={<LeaveApplication></LeaveApplication>}></Route>
        <Route path='/viewleavedetails' element={<ViewLeaveDetails></ViewLeaveDetails>}></Route>
        <Route path='viewallleaves' element={<UpdateLeaveStatus></UpdateLeaveStatus>}></Route>
      </Routes>




    </div>
  );
}

export default App;

function AppContent() {
  let isloggedin = JSON.parse(localStorage.getItem("isloggedin"))
  let user = JSON.parse(localStorage.getItem("userinfo"))
  let location = useLocation();
  let publicpage = ["/", "/home", "/aboutus", "/services", "/contactus"];
  return (
    <div>{
      (isloggedin && user && location.pathname !== "/registeruser") &&
      (user.role.toLowerCase() === "admin" ? <AdminNav /> : <EmpNavbar />)
    }
      {
        (!isloggedin && !user) &&
          publicpage.includes(location.pathname) ?
          <CommanNavbar></CommanNavbar> : null
      }

    </div>
  )
}