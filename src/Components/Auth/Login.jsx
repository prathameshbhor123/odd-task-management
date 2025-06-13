import React, { useState, useEffect } from 'react';
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
import FaceLogin from '../FaceRecognition/FaceLogin'; // Adjust the import path as necessary

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFaceLogin, setShowFaceLogin] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);


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
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);

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
        const userObj = {
          id: response.userId,
          role: response.userRole,
          jwt: response.jwt,
          email: data.email // Capture email here to forward to face login if needed
        };

        if (response.userRole === 'ADMIN') {
          // Admins skip face recognition
          localStorage.setItem('user', JSON.stringify({ id: userObj.id, role: userObj.role }));
          localStorage.setItem('token', userObj.jwt);
          navigate('/admindashboard');
        } else if (response.userRole === 'EMPLOYEE') {
          // Employees go through face login
          setLoggedUser(userObj);
          setShowFaceLogin(true);
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



    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-100 to-pink-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mt-20">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Login to access your dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { backgroundColor: 'white' } }}
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
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                sx: { backgroundColor: 'white', marginTop: '8px' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...register('password', {
                required: 'Password is required'
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <button type="button" className="text-red-500 hover:underline">Forgot password?</button>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#dc2626', '&:hover': { backgroundColor: '#b91c1c' } }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : <><span role="img" aria-label="lock"></span> Verify with Face</>}
            </Button>

            <div className="text-center text-gray-400">or continue with</div>

            <button
              type="button"
              className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center py-2 rounded-md"
            >
              <span className="text-red-500 mr-2 text-xl">G</span> Continue with Google
            </button>
          </form>

          <CardActions>
            <Button
              color="secondary"
              fullWidth
              onClick={() => navigate('/contactus')}
              disabled={isLoading}
              sx={{ fontSize: 'small' }}
            >
              Don't have an account? Contact Admin
            </Button>
          </CardActions>
        </div>

        {/* Right side - Branding */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-black via-red-600 to-orange-500 text-white items-center justify-center p-10">
          {showFaceLogin && loggedUser?.role === 'EMPLOYEE' ? (
            <FaceLogin
              user={loggedUser}
              onSuccess={() => {
                // Save user and token after successful face match
                localStorage.setItem('user', JSON.stringify({ id: loggedUser.id, role: loggedUser.role }));
                localStorage.setItem('token', loggedUser.jwt);
                navigate('/employeedashboard');
              }}
              onFailure={() => {
                setIsError(true);
                setSnackbarMessage('Face not recognized');
                setOpenSnackbar(true);
                setShowFaceLogin(false);
              }}
            />
          ) : (
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-2">OddTech</h2>
              <h3 className="text-3xl font-semibold mb-4">Solutions</h3>
              <p className="text-lg font-semibold mb-2">Build. Track. Achieve.</p>
              <p className="text-sm">Empowering your work with speed and clarity.</p>
            </div>
          )}
        </div>

      </div>

      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;






