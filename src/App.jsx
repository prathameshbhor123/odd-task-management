
import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './Pages/AdminPages/AdminDashboardPage'
import PostTaskPage from './Pages/AdminPages/PostTaskPage'

import SignupPage from './Pages/AuthPages/SignupPage'
import HomePage from './Pages/AuthPages/HomePage'
import LoginPages from './Pages/AuthPages/LoginPages'
import ViewTaskDetailsPage from './Pages/AdminPages/ViewTaskDetailsPage'
import AboutUsPage from './Pages/AuthPages/AboutUsPage'
import ContactUsPage from './Pages/AuthPages/ContactUsPage'
import ViewEmployeeTaskDetailsPage from './Pages/EmployeePages/ViewEmployeeTaskDetailsPage'
import EmployeeDashboardPage from './Pages/EmployeePages/EmployeeDashboardPage'
import ProtectedRoute from './Components/ProtectedRout'
import ShowComplaintsPage from './Pages/AdminPages/ShowComplaintsPage'
import UpdateTaskPage from './Pages/AdminPages/UpdateTaskPage'
function App() {
 
return (
      <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPages />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/home" element={<HomePage/>} />


        {/* Admin Routes */}
        <Route
          path="/admindashboard"
          element={<ProtectedRoute element={AdminDashboardPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/posttask"
          element={<ProtectedRoute element={PostTaskPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/showcomplaints"
          element={<ProtectedRoute element={ShowComplaintsPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/updatetask/:id"
          element={<ProtectedRoute element={UpdateTaskPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/viewtaskdetails/:id"
          element={<ProtectedRoute element={ViewTaskDetailsPage} allowedRoles={['ADMIN']} />}
        />

        {/* Employee Routes */}
        <Route
          path="/employeedashboard"
          element={<ProtectedRoute element={EmployeeDashboardPage} allowedRoles={['EMPLOYEE']} />}
        />
        <Route
          path="/viewemployeetaskdetails/:id"
          element={<ProtectedRoute element={ViewEmployeeTaskDetailsPage} allowedRoles={['EMPLOYEE']} />}
        />
      </Routes>
    </>
  )
}

export default App





// import './App.css'
// import LoginPage from './Pages/LoginPage'
// import SignupPage from './Pages/SignupPage'

// function App() {
 
// return (
//     <>
    
//     <LoginPage/>
//     <SignupPage/>
   
//     </>
//   )
// }{/*

// export default App

