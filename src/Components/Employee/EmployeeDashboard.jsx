import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, MenuItem } from '@mui/material';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const API_BASE_URL = 'http://localhost:8080/api/employee'; // Update with your API base URL

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Get current user ID (you might get this from auth context or localStorage)
    //const userId = localStorage.getItem('user'); // Replace with actual user ID
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const userId = user?.id;
    const fetchTasks = async () => {
        try {

            const response = await axios.get(`${API_BASE_URL}/tasks/${userId}`, {
                params: { userId },
                headers: {

                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            showSnackbar('Failed to load tasks', 'error');
        } finally {
            setLoading(false);
        }
    };

    const updateTaskStatus = async (taskId, status) => {
        try {
            console.log(`Updating task ${taskId} status to ${status}`);
            const response = await axios.put(`${API_BASE_URL}/task/${taskId}/${status}`,
                { status },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.id) {
                showSnackbar('Task updated successfully', 'success');
                fetchTasks();
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
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleMenuOpen = (event, taskId) => {
        setAnchorEl(event.currentTarget);
        setSelectedTaskId(taskId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTaskId(null);
    };

    const handleStatusUpdate = (status) => {
        updateTaskStatus(selectedTaskId, status);
        handleMenuClose();
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        fetchTasks();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-6">
            <div className="max-w-7xl mx-auto mt-20">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Tasks</h1>

                {tasks.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No tasks assigned yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-blue-600 mb-2">{task.title}</h2>
                                    <p className="text-gray-700 mb-3">{task.description}</p>

                                    <div className="border-t border-gray-200 my-2"></div>

                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div>
                                            <span className="text-gray-600">Due Date:</span>
                                            <span className="font-semibold ml-1">{formatDate(task.dueDate)}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Priority:</span>
                                            <span className={`font-semibold ml-1 px-2 py-1 rounded-full text-xs ${task.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                                task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Status:</span>
                                            <span className={`font-semibold ml-1 px-2 py-1 rounded-full text-xs ${task.taskStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                task.taskStatus === 'INPROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {task.taskStatus}

                                            </span>


                                        </div>

                                    </div>


                                    <div className="border-t border-gray-200 my-2"></div>

                                    <div className="flex justify-end space-x-2 mt-3">
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/viewemployeetaskdetails/${task.id}`)}
                                            className="text-blue-600 hover:bg-blue-50"
                                        >
                                            <VisibilityIcon />
                                        </IconButton>

                                        <IconButton
                                            color="secondary"
                                            onClick={(e) => handleMenuOpen(e, task.id)}
                                            className="text-purple-600 hover:bg-purple-50"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Update Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleStatusUpdate('INPROGRESS')}>INPROGRESS</MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('COMPLETED')}>COMPLETED</MenuItem>
            </Menu>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default EmployeeDashboard;