
import Header from "./Components/common/Header/Header";
import Sidebar from "./Components/common/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/pages/Dashboard/Dashboard";
import AddTruck from "./Components/pages/Trucks/AddTruck/AddTruck";
import Truck from "./Components/pages/Trucks/Truck";
import Verification from "./Components/pages/Verification/Verification";
import Trips from "./Components/pages/Trips/Trips";
import Expense from "./Components/pages/Expenses/Expense";
import Firms from "./Components/pages/Firms/Firms";
import AddDriver from "./Components/pages/Driver/AddDriver";
import AddFirms from "./Components/pages/Firms/AddFirms/AddFirms";
import Registration from "./Components/pages/Registration/Registration";
import Login from "./Components/pages/Login/Login";
import { useSelector } from "react-redux";
import Home from "./Components/pages/ForgotPassword/ForgotPassword";
import ForgotPassword from "./Components/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/pages/ResetPasword/ResetPassword";
import PageNotFound from "./Components/pages/PageNotFound/PageNotFound";
import DashboardPageNotFound from "./Components/pages/DashboardPageNotFound/DashboardPageNotFound";
import ChangePassword from "./Components/pages/ChangePassword/ChangePassword";
function App() {
  const login = useSelector((state) => state.loginDetail.login);
  return (
      <BrowserRouter>
      {login ?  
          <>
           <Header />
            <div className='conatiner-fluid'>
              <div className='row m-0'>
                  <div className='col-md-3 col-xl-2 ps-md-0'>
                    <Sidebar />
                  </div>
                  <div className='col-md-9 col-xl-10'>
                      <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/firms" element={<Firms />}/>
                        <Route path="/trucks" element={<Truck/>}/>
                        <Route path="/trips" element={<Trips/>}/>
                        <Route path="/expense" element={<Expense/>}/>
                        <Route path="/addtruck" element={<AddTruck/>}/>
                        <Route path="/adddriver" element={<AddDriver />}/>
                        <Route path="/addfirms" element={<AddFirms/>}/>
                        <Route path="/changepassword" element={<ChangePassword />}/>
                        <Route path="*" element={<DashboardPageNotFound />}/>
                      </Routes>
                  </div>
              </div>
            </div>
          </>
        : 
         <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/verify" element={<Verification/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/resetpassword/:token/:email" element={<ResetPassword />}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      }
      </BrowserRouter>
  
  );
}

export default App;
