// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function UpdateTaskForm() {
//     const { id } = useParams(); // Get task ID from URL
//     const navigate = useNavigate();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isValid },
//         setValue,
//     } = useForm({ mode: "onChange" });

//     const [priorities] = useState(["High", "Medium", "Low"]);
//     const [statuses] = useState(["Pending", "In Progress", "Completed"]);
//     const [employees, setEmployees] = useState([]);

//     // Fetch task and employees on load
//     useEffect(() => {
//         const fetchTask = async () => {
//             try {
//                 const taskRes = await axios.get(`/api/tasks/${id}`);
//                 const empRes = await axios.get(`/api/employees`);

//                 const task = taskRes.data;
//                 setEmployees(empRes.data);

//                 Object.entries(task).forEach(([key, val]) => setValue(key, val));
//             } catch (error) {
//                 console.error("Error loading task or employees:", error);
//             }
//         };

//         fetchTask();
//     }, [id, setValue]);

//     const onSubmit = async (data) => {
//         try {
//             await axios.put(`/api/tasks/${id}`, data);
//             alert("Task updated successfully!");
//             navigate("/tasks"); // Go back to task list or wherever appropriate
//         } catch (error) {
//             console.error("Update failed:", error);
//             alert("Failed to update task.");
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Update Task</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium">Title</label>
//                     <input
//                         type="text"
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         {...register("title", { required: true })}
//                     />
//                     {errors.title && <p className="text-red-500 text-sm">This input is required</p>}
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium">Description</label>
//                     <textarea
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         {...register("description", { required: true })}
//                     ></textarea>
//                     {errors.description && <p className="text-red-500 text-sm">This input is required</p>}
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium">Due Date</label>
//                     <input
//                         type="date"
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         {...register("dueDate", { required: true })}
//                     />
//                     {errors.dueDate && <p className="text-red-500 text-sm">This input is required</p>}
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium">Priority</label>
//                     <select
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         {...register("priority", { required: true })}
//                     >
//                         <option value="">Select priority</option>
//                         {priorities.map((priority) => (
//                             <option key={priority} value={priority}>
//                                 {priority}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.priority && <p className="text-red-500 text-sm">This input is required</p>}
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium">Task Status</label>
//                     <select
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         {...register("taskStatus", { required: true })}
//                     >
//                         <option value="">Select status</option>
//                         {statuses.map((status) => (
//                             <option key={status} value={status}>
//                                 {status}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.taskStatus && <p className="text-red-500 text-sm">This input is required</p>}
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium">Employee</label>
//                     <select
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         {...register("employeeId", { required: true })}
//                     >
//                         <option value="">Select employee</option>
//                         {Array.isArray(employees) && employees.map((employee) => (
//                             <option key={employee.id} value={employee.id}>
//                                 {employee.name}
//                             </option>
//                         ))}

//                     </select>
//                     {errors.employeeId && <p className="text-red-500 text-sm">This input is required</p>}
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
//                     disabled={!isValid}
//                 >
//                     Update Task
//                 </button>
//             </form>
//         </div>
//     );
// }






// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// const UpdateTaskComponent = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//     const [task, setTask] = useState({
//         employeeId: 0,
//         title: '',
//         dueDate: null,
//         description: '',
//         priority: '',
//         taskStatus: ''
//     });

//     const [listOfEmployees, setListOfEmployees] = useState([]);
//     const listOfPriorities = ["LOW", "MEDIUM", "HIGH"];
//     const listOfTaskStatus = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELED"];

//     const getTaskById = async () => {
//         console.log(`Fetching task with id: ${id}`);
//         setTimeout(() => {
//             setTask({
//                 employeeId: 1,
//                 title: 'Sample Task',
//                 dueDate: new Date(Date.now() + 86400000),
//                 description: 'This is a sample task description',
//                 priority: 'MEDIUM',
//                 taskStatus: 'PENDING'
//             });
//         }, 500);
//     };

//     const getUsers = async () => {
//         console.log('Fetching users');
//         setTimeout(() => {
//             setListOfEmployees([
//                 { id: 1, name: 'John Doe' },
//                 { id: 2, name: 'Jane Smith' },
//                 { id: 3, name: 'Bob Johnson' }
//             ]);
//         }, 500);
//     };

//     const updateTask = async () => {
//         console.log(`Updating task with id: ${id}`, task);
//         setTimeout(() => {
//             setSnackbarMessage('Task updated successfully');
//             setSnackbarSeverity('success');
//             setSnackbarOpen(true);
//             navigate('/admindashboard');
//         }, 500);
//     };

//     useEffect(() => {
//         if (id) {
//             getTaskById();
//             getUsers();
//         }
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTask(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSelectChange = (e) => {
//         const { name, value } = e.target;
//         setTask(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleDateChange = (date) => {
//         setTask(prev => ({
//             ...prev,
//             dueDate: date
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!task.employeeId || !task.title || !task.dueDate || !task.description || !task.priority || !task.taskStatus) {
//             setSnackbarMessage('Please fill all required fields');
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//             return;
//         }
//         updateTask();
//     };

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
//                 <div className="p-8">
//                     <div className="text-center mb-8">
//                         <h2 className="text-2xl font-bold text-gray-800">Update Task</h2>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div>
//                             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Title <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 id="title"
//                                 name="title"
//                                 type="text"
//                                 value={task.title}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 required
//                             />
//                             {!task.title && <p className="mt-1 text-sm text-red-600">This field is required</p>}
//                         </div>

//                         <div>
//                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Description <span className="text-red-500">*</span>
//                             </label>
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 rows={4}
//                                 value={task.description}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 required
//                             />
//                             {!task.description && <p className="mt-1 text-sm text-red-600">This field is required</p>}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Due Date <span className="text-red-500">*</span>
//                             </label>
//                             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                 <DatePicker
//                                     value={task.dueDate}
//                                     onChange={handleDateChange}
//                                     renderInput={({ inputRef, inputProps, InputProps }) => (
//                                         <div className="flex items-center">
//                                             <input
//                                                 ref={inputRef}
//                                                 {...inputProps}
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                             />
//                                             {InputProps?.endAdornment}
//                                         </div>
//                                     )}
//                                 />
//                             </LocalizationProvider>
//                             {!task.dueDate && <p className="mt-1 text-sm text-red-600">This field is required</p>}
//                         </div>

//                         <div>
//                             <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Priority <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                                 id="priority"
//                                 name="priority"
//                                 value={task.priority}
//                                 onChange={handleSelectChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 required
//                             >
//                                 <option value="">Select Priority</option>
//                                 {listOfPriorities.map(priority => (
//                                     <option key={priority} value={priority}>{priority}</option>
//                                 ))}
//                             </select>
//                             {!task.priority && <p className="mt-1 text-sm text-red-600">This field is required</p>}
//                         </div>

//                         <div>
//                             <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Status <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                                 id="taskStatus"
//                                 name="taskStatus"
//                                 value={task.taskStatus}
//                                 onChange={handleSelectChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 required
//                             >
//                                 <option value="">Select Status</option>
//                                 {listOfTaskStatus.map(status => (
//                                     <option key={status} value={status}>{status}</option>
//                                 ))}
//                             </select>
//                             {!task.taskStatus && <p className="mt-1 text-sm text-red-600">This field is required</p>}
//                         </div>

//                         <div>
//                             <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Assign Employee <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                                 id="employeeId"
//                                 name="employeeId"
//                                 value={task.employeeId || ''}
//                                 onChange={handleSelectChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 required
//                             >
//                                 <option value="">Select Employee</option>
//                                 {listOfEmployees.map(employee => (
//                                     <option key={employee.id} value={employee.id}>{employee.name}</option>
//                                 ))}
//                             </select>
//                             {!task.employeeId && <p className="mt-1 text-sm text-red-600">This field is required</p>}
//                         </div>

//                         <div className="pt-4">
//                             <button
//                                 type="submit"
//                                 disabled={!task.employeeId || !task.title || !task.dueDate || !task.description || !task.priority || !task.taskStatus}
//                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Update Task
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {snackbarOpen && (
//                 <div className="fixed bottom-4 right-4">
//                     <div className={`px-4 py-2 rounded-md shadow-md ${snackbarSeverity === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         {snackbarMessage}
//                         <button
//                             onClick={handleSnackbarClose}
//                             className="ml-4 text-sm font-semibold focus:outline-none"
//                         >
//                             ×
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UpdateTaskComponent;







// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api/admin'; // Replace with your actual API URL

// const UpdateTaskComponent = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//     const [task, setTask] = useState({
//         employeeId: 0,
//         title: '',
//         dueDate: null,
//         description: '',
//         priority: '',
//         taskStatus: ''
//     });

//     const [listOfEmployees, setListOfEmployees] = useState([]);
//     const listOfPriorities = ["LOW", "MEDIUM", "HIGH"];
//     const listOfTaskStatus = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELED"];

//     const getTaskById = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/task/${id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setTask({
//                 ...response.data,
//                 dueDate: new Date(response.data.dueDate) // Convert string date to Date object
//             });
//         } catch (error) {
//             console.error('Error fetching task:', error);
//             setSnackbarMessage('Failed to load task details');
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//         }
//     };

//     const getUsers = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/users`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setListOfEmployees(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             setSnackbarMessage('Failed to load employee list');
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//         }
//     };

//     const updateTask = async () => {
//         try {
//             const response = await axios.put(`${API_BASE_URL}/task/${id}`, {
//                 ...task,
//                 dueDate: task.dueDate.toISOString() // Convert Date object to ISO string
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             setSnackbarMessage('Task updated successfully');
//             setSnackbarSeverity('success');
//             setSnackbarOpen(true);
//             navigate('/admindashboard');
//         } catch (error) {
//             console.error('Error updating task:', error);
//             setSnackbarMessage(error.response?.data?.message || 'Failed to update task');
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//         }
//     };

//     useEffect(() => {
//         if (id) {
//             getTaskById();
//             getUsers();
//         }
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTask(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSelectChange = (e) => {
//         const { name, value } = e.target;
//         setTask(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleDateChange = (date) => {
//         setTask(prev => ({
//             ...prev,
//             dueDate: date
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!task.employeeId || !task.title || !task.dueDate || !task.description || !task.priority || !task.taskStatus) {
//             setSnackbarMessage('Please fill all required fields');
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//             return;
//         }
//         updateTask();
//     };

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//             {/* Rest of your JSX remains exactly the same */}
//             {/* ... */}
//         </div>
//     );
// };

// export default UpdateTaskComponent;







import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const API_BASE_URL = 'http://localhost:8080/api/admin'; // Update with your API base URL

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        employeeId: '',
        title: '',
        dueDate: null,
        description: '',
        priority: '',
        taskStatus: ''
    });

    const [listOfEmployees, setListOfEmployees] = useState([]);
    const listOfPriorities = ["LOW", "MEDIUM", "HIGH"];
    const listOfTaskStatus = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELED"];

    const getTaskById = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/task/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setFormData({
                ...response.data,
                dueDate: new Date(response.data.dueDate)
            });
        } catch (error) {
            console.error('Error fetching task:', error);
            showSnackbar('Failed to load task details', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setListOfEmployees(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            showSnackbar('Failed to load employee list', 'error');
        }
    };

    const updateTask = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/task/${id}`, {
                ...formData,
                dueDate: formData.dueDate.toISOString()
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.id) {
                showSnackbar('Task updated successfully', 'success');
                navigate('/admindashboard');
            } else {
                showSnackbar('Something went wrong', 'error');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            showSnackbar(error.response?.data?.message || 'Failed to update task', 'error');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
        setTimeout(() => setSnackbar({ ...snackbar, open: false }), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            dueDate: date
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.employeeId || !formData.title || !formData.dueDate ||
            !formData.description || !formData.priority || !formData.taskStatus) {
            showSnackbar('Please fill all required fields', 'error');
            return;
        }
        updateTask();
    };

    useEffect(() => {
        if (id) {
            getTaskById();
            getUsers();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container max-w-md mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Update Task</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Due Date Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date <span className="text-red-500">*</span>
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={formData.dueDate}
                            onChange={handleDateChange}
                            className="w-full"
                        />
                    </LocalizationProvider>
                </div>

                {/* Priority Field */}
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                        Priority <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="">Select Priority</option>
                        {listOfPriorities.map(priority => (
                            <option key={priority} value={priority}>{priority}</option>
                        ))}
                    </select>
                </div>

                {/* Status Field */}
                <div>
                    <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-1">
                        Status <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="taskStatus"
                        name="taskStatus"
                        value={formData.taskStatus}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="">Select Status</option>
                        {listOfTaskStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                {/* Employee Field */}
                <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                        Assign Employee <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="">Select Employee</option>
                        {listOfEmployees.map(employee => (
                            <option key={employee.id} value={employee.id}>{employee.name}</option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update Task
                    </button>
                </div>
            </form>

            {/* Snackbar Notification */}
            {snackbar.open && (
                <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center ${snackbar.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <span>{snackbar.message}</span>
                    <button
                        onClick={() => setSnackbar({ ...snackbar, open: false })}
                        className="ml-4 font-bold focus:outline-none"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default UpdateTask;