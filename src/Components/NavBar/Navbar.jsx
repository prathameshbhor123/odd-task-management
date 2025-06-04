// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Menu, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logoWhite.webp'; // Adjust the path as necessary

// const Navbar = () => {
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const logout = () => {
//     setIsAdminLoggedIn(false);
//     setIsEmployeeLoggedIn(false);
//   };

//   const guestLinks = [
//     { name: 'Home', path: '/home' },
//     { name: 'AboutUs', path: '/aboutus' },
//     { name: 'ContactUs', path: '/contactus' },
//     { name: 'Register', path: '/register' },
//     { name: 'Login', path: '/loginpage' },
//   ];

//   const adminLinks = [
//     { name: 'Dashboard', path: '/admindashboard' },
//     { name: 'Post Task', path: '/admin/task/post' },
//     { name: 'Show Grievance', path: '/admin/show' },
//   ];

//   const employeeLinks = [
//     { name: 'Dashboard', path: '/employee/dashboard' },
//   ];

//   const renderLinks = () => {
//     if (isAdminLoggedIn) return adminLinks;
//     if (isEmployeeLoggedIn) return employeeLinks;
//     return guestLinks;
//   };

//   return (
//     <header className="shadow-md fixed top-0 left-0 w-full bg-white z-50">
//       <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-10 py-4 flex justify-between items-center">
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex-shrink-0"
//         >
//           <Link to="/">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-17 h-auto rounded-xl shadow-md"
//               style={{ borderRadius: '12px' }}
//             />
//           </Link>
//         </motion.div>

//         <nav className="hidden md:flex space-x-6 items-center">
//           {renderLinks().map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
//             >
//               {link.name}
//             </Link>
//           ))}
//           {(isAdminLoggedIn || isEmployeeLoggedIn) && (
//             <button
//               onClick={logout}
//               className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition-all duration-300"
//             >
//               Logout
//             </button>
//           )}
//         </nav>

//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {isOpen && (
//         <motion.nav
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="md:hidden bg-white px-6 pb-4 space-y-3 shadow"
//         >
//           {renderLinks().map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
//               onClick={() => setIsOpen(false)}
//             >
//               {link.name}
//             </Link>
//           ))}
//           {(isAdminLoggedIn || isEmployeeLoggedIn) && (
//             <button
//               onClick={() => {
//                 logout();
//                 setIsOpen(false);
//               }}
//               className="block bg-red-500 text-white text-center py-2 rounded-full shadow hover:bg-red-600 transition-all duration-300 w-full"
//             >
//               Logout
//             </button>
//           )}
//         </motion.nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
// import { motion } from 'framer-motion';

// const App = () => {
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
//   const [isRegisterMenuOpen, setIsRegisterMenuOpen] = useState(false);

//   const logout = () => {
//     setIsAdminLoggedIn(false);
//     setIsEmployeeLoggedIn(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navigation */}
//       {!isAdminLoggedIn && !isEmployeeLoggedIn && (
//         <header className="bg-purple-700 text-white shadow-md">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex items-center justify-between">
//               <Link to="/" className="text-xl font-semibold">
//                 Grievance Redressal System
//               </Link>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:flex items-center space-x-4">
//                 <Link to="/" className="hover:bg-purple-600 px-3 py-2 rounded transition">
//                   Home
//                 </Link>
//                 <Link to="/aboutus" className="hover:bg-purple-600 px-3 py-2 rounded transition">
//                   AboutUs
//                 </Link>
//                 <Link to="/contactus" className="hover:bg-purple-600 px-3 py-2 rounded transition">
//                   ContactUs
//                 </Link>
//                 <Link to="/userdashboard" className="hover:bg-purple-600 px-3 py-2 rounded transition">
//                   Submit Grievance
//                 </Link>

//                 <div className="relative">
//                   <button
//                     onClick={() => setIsRegisterMenuOpen(!isRegisterMenuOpen)}
//                     className="hover:bg-purple-600 px-3 py-2 rounded transition"
//                   >
//                     Register
//                   </button>
//                   {isRegisterMenuOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
//                     >
//                       <Link
//                         to="/register"
//                         className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
//                         onClick={() => setIsRegisterMenuOpen(false)}
//                       >
//                         Employee
//                       </Link>
//                     </motion.div>
//                   )}
//                 </div>

//                 <div className="relative">
//                   <button
//                     onClick={() => setIsLoginMenuOpen(!isLoginMenuOpen)}
//                     className="hover:bg-purple-600 px-3 py-2 rounded transition"
//                   >
//                     Login
//                   </button>
//                   {isLoginMenuOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
//                     >
//                       <Link
//                         to="/login"
//                         className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
//                         onClick={() => setIsLoginMenuOpen(false)}
//                       >
//                         Admin
//                       </Link>
//                       <Link
//                         to="/login"
//                         className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
//                         onClick={() => setIsLoginMenuOpen(false)}
//                       >
//                         Employee
//                       </Link>
//                     </motion.div>
//                   )}
//                 </div>
//               </nav>

//               {/* Mobile menu button */}
//               <button
//                 className="md:hidden p-2 rounded-md hover:bg-purple-600"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>

//             {/* Mobile Navigation */}
//             {isMobileMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 className="md:hidden mt-4 space-y-2 pb-2"
//               >
//                 <Link
//                   to="/"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/aboutus"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   AboutUs
//                 </Link>
//                 <Link
//                   to="/contactus"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   ContactUs
//                 </Link>
//                 <Link
//                   to="/userdashboard"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Submit Grievance
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Register
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//               </motion.div>
//             )}
//           </div>
//         </header>
//       )}

//       {isAdminLoggedIn && (
//         <header className="bg-purple-700 text-white shadow-md">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex items-center justify-between">
//               <Link to="/" className="text-xl font-semibold">
//                 Grievance Redressal System
//               </Link>

//               <nav className="hidden md:flex items-center space-x-4">
//                 <Link to="/admin/dashboard" className="hover:bg-purple-600 px-3 py-2 rounded transition">
//                   Admin Dashboard
//                 </Link>
//                 <Link to="/admin/task/post" className="hover:bg-purple-600 px-3 py-2 rounded transition">
//                   Post Task
//                 </Link>
//                 <Link to="/admin/show" className="hover:bg-purple-600 px-3 py-2 rounded transition">
//                   Show Grievance
//                 </Link>
//                 <button
//                   onClick={logout}
//                   className="hover:bg-purple-600 px-3 py-2 rounded transition"
//                 >
//                   Logout
//                 </button>
//               </nav>

//               <button
//                 className="md:hidden p-2 rounded-md hover:bg-purple-600"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>

//             {isMobileMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 className="md:hidden mt-4 space-y-2 pb-2"
//               >
//                 <Link
//                   to="/admin/dashboard"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Admin Dashboard
//                 </Link>
//                 <Link
//                   to="/admin/task/post"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Post Task
//                 </Link>
//                 <Link
//                   to="/admin/show"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Show Grievance
//                 </Link>
//                 <button
//                   onClick={() => {
//                     logout();
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-left hover:bg-purple-600 px-3 py-2 rounded transition"
//                 >
//                   Logout
//                 </button>
//               </motion.div>
//             )}
//           </div>
//         </header>
//       )}

//       {isEmployeeLoggedIn && (
//         <header className="bg-purple-700 text-white shadow-md">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex items-center justify-between">
//               <Link to="/" className="text-xl font-semibold">
//                 Grievance Redressal System
//               </Link>

//               <nav className="hidden md:flex items-center space-x-4">
//                 <Link to="/employee/dashboard" className="hover:bg-purple-600 px-3 py-2 rounded transition">
//                   Employee Dashboard
//                 </Link>
//                 <button
//                   onClick={logout}
//                   className="hover:bg-purple-600 px-3 py-2 rounded transition"
//                 >
//                   Logout
//                 </button>
//               </nav>

//               <button
//                 className="md:hidden p-2 rounded-md hover:bg-purple-600"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>

//             {isMobileMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 className="md:hidden mt-4 space-y-2 pb-2"
//               >
//                 <Link
//                   to="/employee/dashboard"
//                   className="block hover:bg-purple-600 px-3 py-2 rounded transition"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Employee Dashboard
//                 </Link>
//                 <button
//                   onClick={() => {
//                     logout();
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-left hover:bg-purple-600 px-3 py-2 rounded transition"
//                 >
//                   Logout
//                 </button>
//               </motion.div>
//             )}
//           </div>
//         </header>
//       )}

//       {/* Main Content */}
//       <main className="flex-grow">
//         {/* Router outlet would go here */}
//       </main>

//       {/* Footer */}
//       <footer className="bg-purple-700 text-white pt-8 pb-4">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
//             <div className="col-span-2 md:col-span-1">
//               <h3 className="font-bold text-lg mb-4">Mumbai Municipal Corporation</h3>
//               <p className="mb-2">
//                 Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India
//               </p>
//               <p className="mb-2">020-25501000</p>
//               <p>020-25501130</p>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4">Menu</h4>
//               <ul className="space-y-2">
//                 <li><Link to="/" className="hover:underline">Home</Link></li>
//                 <li><Link to="/register" className="hover:underline">Register</Link></li>
//                 <li><Link to="/aboutus" className="hover:underline">About</Link></li>
//                 <li><Link to="/contactus" className="hover:underline">Contact Us</Link></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4">More</h4>
//               <ul className="space-y-2">
//                 <li>Other Pages</li>
//                 <li>FAQs</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4">Services</h4>
//               <ul className="space-y-2">
//                 <li>Online Services</li>
//                 <li>Care</li>
//                 <li>Open Data Portal</li>
//                 <li>App Store</li>
//               </ul>
//             </div>

//             <div className="col-span-2 md:col-span-1 md:text-right">
//               <h4 className="font-bold mb-4">Social Media Links</h4>
//               <div className="flex space-x-4 md:justify-end">
//                 <a href="https://www.facebook.com/" className="hover:text-purple-300">
//                   <i className="fab fa-facebook-f text-xl"></i>
//                 </a>
//                 <a href="#" className="hover:text-purple-300">
//                   <i className="fab fa-x-twitter text-xl"></i>
//                 </a>
//                 <a href="#" className="hover:text-purple-300">
//                   <i className="fab fa-instagram text-xl"></i>
//                 </a>
//                 <a href="#" className="hover:text-purple-300">
//                   <i className="fab fa-linkedin text-xl"></i>
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-purple-600 mt-8 pt-4">
//             <div className="flex flex-col sm:flex-row justify-between items-center">
//               <p>2025 © MMC cop. All Rights Reserved.</p>
//               <div className="flex space-x-4 mt-2 sm:mt-0">
//                 <Link to="#" className="hover:underline">Terms of use</Link>
//                 <Link to="#" className="hover:underline">Privacy policy</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;
















// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Menu, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/logoWhite.webp';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { name: 'Dashboard', path: '/managedashboard' },
//     { name: 'Features', path: '/features' },
//     { name: 'Pricing', path: '/pricing' },
//     { name: 'About', path: '/about' },
//   ];

//   return (
//     <header className="shadow-md fixed top-0 left-0 w-full bg-white z-50">
//       {/* Increased max-width to full and padding on sides */}
//       <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-10 py-4 flex justify-between items-center">
//         {/* Logo - Left aligned with rectangular shape */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex-shrink-0"
//         >
//           <Link to="/managedashboard">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-17 h-auto rounded-xl shadow-md"
//               style={{ borderRadius: '12px' }}
//             />
//           </Link>
//         </motion.div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 items-center">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
//             >
//               {link.name}
//             </Link>
//           ))}
//           <Link
//             to="/login"
//             className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-all duration-300"
//           >
//             Login
//           </Link>
//         </nav>

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Nav - Increased side padding */}
//       {isOpen && (
//         <motion.nav
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="md:hidden bg-white px-6 pb-4 space-y-3 shadow"
//         >
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
//               onClick={() => setIsOpen(false)}
//             >
//               {link.name}
//             </Link>
//           ))}
//           <Link
//             to="/login"
//             className="block bg-blue-600 text-white text-center py-2 rounded-full shadow hover:bg-blue-700 transition-all duration-300"
//             onClick={() => setIsOpen(false)}
//           >
//             Login
//           </Link>
//         </motion.nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;






// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Menu, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/logoWhite.webp';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { name: 'Dashboard', path: '/managedashboard' },
//     { name: 'Features', path: '/features' },
//     { name: 'Pricing', path: '/pricing' },
//     { name: 'About', path: '/about' },
//   ];

//   return (
//     <header className="shadow-md fixed top-0 left-0 w-full bg-white z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         {/* Logo - Left aligned with rectangular shape */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex-shrink-0"
//         >
//           <Link to="/managedashboard">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-17 h-auto rounded-xl shadow-md" // Changed to rectangular with 12px radius
//               style={{ borderRadius: '12px' }} // Explicitly setting 12px border radius
//             />
//           </Link>
//         </motion.div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 items-center">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
//             >
//               {link.name}
//             </Link>
//           ))}
//           <Link
//             to="/login"
//             className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-all duration-300"
//           >
//             Login
//           </Link>
//         </nav>

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       {isOpen && (
//         <motion.nav
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="md:hidden bg-white px-4 pb-4 space-y-3 shadow"
//         >
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
//               onClick={() => setIsOpen(false)}
//             >
//               {link.name}
//             </Link>
//           ))}
//           <Link
//             to="/login"
//             className="block bg-blue-600 text-white text-center py-2 rounded-full shadow hover:bg-blue-700 transition-all duration-300"
//             onClick={() => setIsOpen(false)}
//           >
//             Login
//           </Link>
//         </motion.nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;




// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Menu, X } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { name: 'Home', href: '#' },
//     { name: 'Features', href: '#' },
//     { name: 'Pricing', href: '#' },
//     { name: 'About', href: '#' },
//   ];

//   return (
//     <header className="shadow-md fixed top-0 left-0 w-full bg-white z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-2xl font-bold text-blue-600"
//         >
//           Logo
//         </motion.div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 items-center">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
//             >
//               {link.name}
//             </a>
//           ))}
//           <a
//             href="/login"
//             className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-all duration-300"
//           >
//             Login
//           </a>
//         </nav>

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       {isOpen && (
//         <motion.nav
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="md:hidden bg-white px-4 pb-4 space-y-3 shadow"
//         >
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
//             >
//               {link.name}
//             </a>
//           ))}
//           <a
//             href="/login"
//             className="block bg-blue-600 text-white text-center py-2 rounded-full shadow hover:bg-blue-700 transition-all duration-300"
//           >
//             Login
//           </a>
//         </motion.nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;







import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logoWhite.webp';

// Storage Service implementation
const StorageService = {
  TOKEN: "token",
  USER: "user",

  saveToken(token) {
    window.localStorage.removeItem(this.TOKEN);
    window.localStorage.setItem(this.TOKEN, token);
  },

  saveUser(user) {
    window.localStorage.removeItem(this.USER);
    window.localStorage.setItem(this.USER, JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem(this.TOKEN);
  },

  getUser() {
    const user = localStorage.getItem(this.USER);
    return user ? JSON.parse(user) : null;
  },

  getUserRole() {
    const user = this.getUser();
    return user ? user.role : null;
  },

  isAdminLoggedIn() {
    if (this.getToken() === null) return false;
    const role = this.getUserRole();
    return role === "ADMIN";
  },

  isEmployeeLoggedIn() {
    if (this.getToken() === null) return false;
    const role = this.getUserRole();
    return role === "EMPLOYEE";
  },

  getUserId() {
    const user = this.getUser();
    return user ? user.id : null;
  },

  hasToken() {
    return this.getToken() !== null;
  },

  signout() {
    window.localStorage.removeItem(this.TOKEN);
    window.localStorage.removeItem(this.USER);
  }
};

const Navbar = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdminLoggedIn(StorageService.isAdminLoggedIn());
    setIsEmployeeLoggedIn(StorageService.isEmployeeLoggedIn());
  }, []);

  const logout = () => {
    StorageService.signout();
    setIsAdminLoggedIn(false);
    setIsEmployeeLoggedIn(false);
    localStorage.removeItem('welcomePopupShown');
    navigate('/loginpage');
  };

  const guestLinks = [
    { name: 'Home', path: '/home' },
    { name: 'AboutUs', path: '/aboutus' },
    { name: 'ContactUs', path: '/contactus' },
    { name: 'Login', path: '/loginpage' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admindashboard' },
    { name: 'Assign Task', path: '/posttask' },
    { name: 'Register', path: '/signup' },

  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/employeedashboard' },
  ];

  const renderLinks = () => {
    if (isAdminLoggedIn) return adminLinks;
    if (isEmployeeLoggedIn) return employeeLinks;
    return guestLinks;
  };

  return (
    <header className="shadow-md fixed top-0 left-0 w-full bg-white z-50">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-10 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-17 h-auto rounded-xl shadow-md"
              style={{ borderRadius: '12px' }}
            />
          </Link>
        </motion.div>

        <nav className="hidden md:flex space-x-6 items-center">
          {renderLinks().map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          {(isAdminLoggedIn || isEmployeeLoggedIn) && (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-white px-6 pb-4 space-y-3 shadow"
        >
          {renderLinks().map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {(isAdminLoggedIn || isEmployeeLoggedIn) && (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="block bg-red-500 text-white text-center py-2 rounded-full shadow hover:bg-red-600 transition-all duration-300 w-full"
            >
              Logout
            </button>
          )}
        </motion.nav>
      )}
    </header>
  );
};

export default Navbar;
