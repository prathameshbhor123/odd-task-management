import React from 'react'
import EmployeeDashboard from '../../Components/Employee/EmployeeDashboard'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'

export default function EmployeeDashboardPage() {
    return (
        <div>
            <Navbar />
            <EmployeeDashboard />
            <Footer />
        </div>
    )
}
