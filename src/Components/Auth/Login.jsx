import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      if (user.role === 'ADMIN') {
        navigate('/admindashboard', { replace: true });
      } else if (user.role === 'EMPLOYEE') {
        navigate('/employeedashboard', { replace: true });
      }
    }
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // API call to login endpoint

  const loginUser = async (credentials) => {
    try {
      setIsLoading(true);
      // Replace this URL with your actual API endpoint
      const response = await axios.post('/api/auth/login', credentials);
      
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up request');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      
      if (response.userId) {
        localStorage.setItem('user', JSON.stringify({
          id: response.userId,
          role: response.userRole
        }));
        localStorage.setItem('token', response.jwt);
        
        if (response.userRole === 'ADMIN') {
          navigate('/admindashboard');
        } else if (response.userRole === 'EMPLOYEE') {
          navigate('/employeedashboard');
        }
      } else {
        setIsError(true);
        setSnackbarMessage('Invalid Credentials');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setIsError(true);
      setSnackbarMessage(error.message || 'Login Failed');
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: 'url("https://blogimage.vantagecircle.com/content/images/2019/10/employee-grievances.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <Card sx={{
        maxWidth: 400,
        width: '100%',
        padding: '20px',
        backgroundColor: '#D3C5E5',
        marginTop: '50px',
        '@media (max-width: 500px)': {
          maxWidth: '90%'
        }
      }}>
        <CardHeader 
          title="Login" 
          sx={{
            textAlign: 'center',
            fontSize: '24px',
            marginBottom: '20px'
          }} 
        />
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required'
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ marginTop: '20px' }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        
        <CardActions>
          <Button 
            color="secondary" 
            fullWidth 
            onClick={() => navigate('/contactus')}
            disabled={isLoading}
          >
            Don't have an account? Contact Admin
          </Button>
        </CardActions>
      </Card>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={isError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;







// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardActions,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Button,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [isError, setIsError] = useState(false);
//   const navigate = useNavigate();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: '',
//       password: ''
//     }
//   });

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   const onSubmit = async (data) => {
//     try {
//       // Replace with your actual authentication service call
//       // const response = await authService.login(data);
//       // Mock response for demonstration
//       const mockResponse = {
//         userId: '123',
//         userRole: 'ADMIN', // or 'EMPLOYEE' for employee login
//         jwt: 'mock-jwt-token'
//       };
      
//       if (mockResponse.userId) {
//         // Mock storage functions - replace with your actual implementation
//         localStorage.setItem('user', JSON.stringify({
//           id: mockResponse.userId,
//           role: mockResponse.userRole
//         }));
//         localStorage.setItem('token', mockResponse.jwt);
        
//         if (mockResponse.userRole === 'ADMIN') {
//           navigate('/admin/dashboard');
//         } else if (mockResponse.userRole === 'EMPLOYEE') {
//           navigate('/employee/dashboard');
//         }
//       } else {
//         setIsError(true);
//         setSnackbarMessage('Invalid Credentials');
//         setOpenSnackbar(true);
//       }
//     } catch (error) {
//       setIsError(true);
//       setSnackbarMessage('Login Failed');
//       setOpenSnackbar(true);
//     }
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundImage: 'url("https://blogimage.vantagecircle.com/content/images/2019/10/employee-grievances.png")',
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: 'cover'
//     }}>
//       <Card sx={{
//         maxWidth: 400,
//         width: '100%',
//         padding: '20px',
//         backgroundColor: '#D3C5E5',
//         '@media (max-width: 500px)': {
//           maxWidth: '90%'
//         }
//       }}>
//         <CardHeader 
//           title="Login" 
//           sx={{
//             textAlign: 'center',
//             fontSize: '24px',
//             marginBottom: '20px'
//           }} 
//         />
        
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: 'Invalid email address'
//                 }
//               })}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//             />
            
//             <TextField
//               label="Password"
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               type={showPassword ? 'text' : 'password'}
//               {...register('password', {
//                 required: 'Password is required'
//               })}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={togglePasswordVisibility}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
            
//             <Button 
//               type="submit" 
//               variant="contained" 
//               color="primary" 
//               fullWidth 
//               sx={{ marginTop: '20px' }}
//             >
//               Login
//             </Button>
//           </form>
//         </CardContent>
        
//         <CardActions>
//           <Button 
//             color="secondary" 
//             fullWidth 
//             onClick={() => navigate('/register')}
//           >
//             Don't have an account? Sign Up
//           </Button>
//         </CardActions>
//       </Card>
      
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={5000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={isError ? 'error' : 'success'}
//           sx={{ width: '100%' }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Login;
















// // import { motion } from 'framer-motion';
// // import { Lock, Mail, User, ArrowRight, Facebook, Twitter, Github } from 'lucide-react';
// // import Footer from '../Components/Footer';
// // import Navbar from '../Components/Navbar';
// // import img1 from '../assets/demo.jpg'
// // import { useNavigate } from 'react-router-dom';

// // import { Link } from 'react-router-dom';



// // const LoginPage = () => {
// //   const navigate = useNavigate();
// //   return (
// //     <>
// //       <Navbar />
      
// //       <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 mt-20 mb-10">
// //         <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
// //           {/* Left Section - Login Form */}
// //           <motion.div 
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="w-full md:w-1/2 p-8 lg:p-12"
// //           >
// //             <div className="max-w-md mx-auto">
// //               <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
// //               <p className="text-gray-500 mb-8">Please login in to continue</p>

// //               <form className="space-y-6">
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.2 }}
// //                 >
// //                   <label className="block text-gray-700 mb-2">Email</label>
// //                   <div className="relative">
// //                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// //                     <input 
// //                       type="email"
// //                       className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
// //                       placeholder="Enter your email"
// //                     />
// //                   </div>
// //                 </motion.div>

// //                 <motion.div
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.3 }}
// //                 >
// //                   <label className="block text-gray-700 mb-2">Password</label>
// //                   <div className="relative">
// //                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// //                     <input 
// //                       type="password"
// //                       className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
// //                       placeholder="Enter your password"
// //                     />
// //                   </div>
// //                 </motion.div>

// //                 <motion.div
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.4 }}
// //                   className="flex items-center justify-between"
// //                 >
// //                   <label className="flex items-center">
// //                     <input type="checkbox" className="rounded text-blue-500" />
// //                     <span className="ml-2 text-gray-600">Remember me</span>
// //                   </label>
                
// //                   <a href="#" className="text-blue-600 hover:underline" onClick={() => navigate('/forgot-password')}>Forgot password?</a>

// //                 </motion.div>

// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
// //                 >
// //                   <User className="w-5 h-5" />
// //                   Login
// //                   <ArrowRight className="w-4 h-4" />
// //                 </motion.button>
// //               </form>

// //               <div className="mt-8">
// //                 <p className="text-center text-gray-500 mb-4">Or continue with</p>
// //                 <div className="flex justify-center space-x-4">
// //                   <motion.a whileHover={{ y: -2 }} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" href="#"><Facebook className="w-6 h-6 text-blue-600" /></motion.a>
// //                   <motion.a whileHover={{ y: -2 }} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" href="#"><Twitter className="w-6 h-6 text-blue-400" /></motion.a>
// //                   <motion.a whileHover={{ y: -2 }} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" href="#"><Github className="w-6 h-6 text-gray-800" /></motion.a>
// //                 </div>
// //               </div>
// //             </div>
// //       <div className="mt-6 text-center">
// //       <p className="text-gray-600 ">
// //             Don’t have an account?{' '}
// //       <button className="text-blue-600 font-medium hover:underline" onClick={()=>navigate("/signup")}>Sign Up</button>
// //     </p>
// //       </div>
// //           </motion.div>

// //           {/* Right Section - Illustration */}
// //           <motion.div 
// //             initial={{ opacity: 0, x: 50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 hidden md:flex items-center justify-center p-8 relative"
// //           >
// //             <div className="relative z-10 text-white max-w-md text-center">
// //               <motion.div animate={{ y: [-5, 5] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}>
// //                 <img src={img1} alt="Login Illustration" className="w-full max-w-xs mx-auto mb-8" />
// //               </motion.div>
// //               <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
// //               <p className="text-blue-100">Join thousands of satisfied users managing their accounts securely</p>
// //             </div>

// //             {/* Animated Background Elements */}
// //             <div className="absolute inset-0 overflow-hidden">
// //               {[...Array(5)].map((_, i) => (
// //                 <motion.div
// //                   key={i}
// //                   className="absolute w-8 h-8 border-2 border-white/10 rounded-full"
// //                   style={{
// //                     top: `${Math.random() * 100}%`,
// //                     left: `${Math.random() * 100}%`,
// //                   }}
// //                   animate={{
// //                     scale: [0, 1, 0],
// //                     opacity: [0, 0.3, 0],
// //                   }}
// //                   transition={{
// //                     duration: 3 + Math.random() * 5,
// //                     repeat: Infinity,
// //                     delay: Math.random() * 2,
// //                   }}
// //                 />
// //               ))}
// //             </div>
            
// //           </motion.div>
// //         </div>
// //       </div>
      
// //       <Footer />
// //     </>
// //   );
// // };

// // export default LoginPage;
