
import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboaPage from './Pages/AdminPages/AdminDashboardPage'
import PostTaskPage from './Pages/AdminPages/PostTaskPage'
import ShowComplaints from './Components/Admin/ShowComplaints'
import UpdateTask from './Components/Admin/UpdateTask'
import SignupPage from './Pages/AuthPages/SignupPage'
import HomePage from './Pages/AuthPages/HomePage'
import LoginPages from './Pages/AuthPages/LoginPages'
import ViewTaskDetailsPage from './Pages/AdminPages/ViewTaskDetailsPage'
import AboutUsPage from './Pages/AuthPages/AboutUsPage'
import ContactUsPage from './Pages/AuthPages/ContactUsPage'
import ViewEmployeeTaskDetailsPage from './Pages/EmployeePages/ViewEmployeeTaskDetailsPage'
import EmployeeDashboardPage from './Pages/EmployeePages/EmployeeDashboardPage'

function App() {
 
return (
    <>
   
        <Routes>
          <Route path='/' element={<HomePage/>} />
        <Route path='/admindashboard' element={<AdminDashboaPage/>} />
        <Route path='/posttask' element={<PostTaskPage/>} />
        <Route path='/showcomplaints' element={<ShowComplaints/>} />
         <Route path='/updatetask/:id' element={<UpdateTask/>} /> 
         <Route path='/viewtaskdetails/:id' element={<ViewTaskDetailsPage/>} />
         <Route path='/loginpage' element={<LoginPages/>} />
         <Route path='/aboutus' element={<AboutUsPage/>} />
         <Route path='/contactus' element={<ContactUsPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
         <Route path='/employeedashboard' element={<EmployeeDashboardPage/>} />
         <Route path='/viewemployeetaskdetails/:id' element={<ViewEmployeeTaskDetailsPage/>} />
         <Route path='/home' element={<HomePage/>} />
         
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

