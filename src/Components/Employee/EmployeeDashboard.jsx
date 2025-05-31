import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Menu,
    MenuItem,
    IconButton,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Badge,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Tooltip
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Notifications as NotificationsIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:8080/api/employee';

// Date comparison utility
const compareDates = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);

    return {
        isOverdue: dueDate < today,
        isDueToday: dueDate.getTime() === today.getTime(),
        dueDateObj: dueDate
    };
};

// Check if date is today
const isToday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [unseenNotifications, setUnseenNotifications] = useState([]);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const userId = user?.id;

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/tasks/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const sortedTasks = response.data.sort((a, b) => {
                const isACompleted = a.taskStatus === 'COMPLETED';
                const isBCompleted = b.taskStatus === 'COMPLETED';

                if (isACompleted && !isBCompleted) return 1;
                if (!isACompleted && isBCompleted) return -1;

                const aComparison = compareDates(a.dueDate);
                const bComparison = compareDates(b.dueDate);

                if (aComparison.isOverdue === bComparison.isOverdue) {
                    return aComparison.dueDateObj - bComparison.dueDateObj;
                }
                if (aComparison.isOverdue) return -1;
                return 1;
            });

            setTasks(sortedTasks);

            // Check for new tasks
            const todayAssigned = sortedTasks.filter(task => isToday(task.startDate));
            setTodaysTasks(todayAssigned);

            const shownTasksKey = `shownTasks_${userId}`;
            const shownTaskIds = JSON.parse(localStorage.getItem(shownTasksKey)) || [];

            const newTasks = todayAssigned.filter(task => !shownTaskIds.includes(task.id));

            // Update unseen notifications
            const unseenKey = `unseenNotifications_${userId}`;
            const unseenIds = JSON.parse(localStorage.getItem(unseenKey)) || [];

            const trulyNewTasks = newTasks.filter(task => !unseenIds.includes(task.id));
            if (trulyNewTasks.length > 0) {
                setUnseenNotifications(prev => [...trulyNewTasks, ...prev]);
                localStorage.setItem(unseenKey, JSON.stringify([...trulyNewTasks.map(t => t.id), ...unseenIds]));
            }

            if (newTasks.length > 0) {
                setTodaysTasks(newTasks);
                setShowWelcomePopup(true);

                const updatedShownIds = [...shownTaskIds, ...newTasks.map(task => task.id)];
                localStorage.setItem(shownTasksKey, JSON.stringify(updatedShownIds));
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
            showSnackbar('Failed to load tasks', 'error');
        } finally {
            setLoading(false);
        }
    };

    const updateTaskStatus = async (taskId, status) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/task/${taskId}/${status}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

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

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const removeNotification = (taskId) => {
        setUnseenNotifications(prev => prev.filter(task => task.id !== taskId));

        // Update localStorage
        const unseenKey = `unseenNotifications_${userId}`;
        const unseenIds = JSON.parse(localStorage.getItem(unseenKey)) || [];
        localStorage.setItem(unseenKey, JSON.stringify(unseenIds.filter(id => id !== taskId)));
    };

    const clearAllNotifications = () => {
        setUnseenNotifications([]);

        // Update localStorage
        const unseenKey = `unseenNotifications_${userId}`;
        localStorage.setItem(unseenKey, JSON.stringify([]));
        handleNotificationClose();
    };

    useEffect(() => {
        fetchTasks();

        // Load any existing unseen notifications
        const unseenKey = `unseenNotifications_${userId}`;
        const storedUnseen = JSON.parse(localStorage.getItem(unseenKey)) || [];
        if (storedUnseen.length > 0) {
            // We'll populate the actual task data when fetchTasks runs
            setUnseenNotifications(storedUnseen.map(id => ({ id })));
        }
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>

                    <Tooltip title="Notifications">
                        <IconButton
                            color="inherit"
                            onClick={handleNotificationClick}
                            className="relative"
                        >
                            <Badge
                                badgeContent={unseenNotifications.length}
                                color="error"
                                overlap="circular"
                            >
                                <motion.div
                                    animate={unseenNotifications.length > 0 ? {
                                        scale: [1, 1.2, 1],
                                        transition: { repeat: Infinity, duration: 2 }
                                    } : {}}
                                >
                                    <NotificationsIcon className="text-gray-600" />
                                </motion.div>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </div>

                {/* Notification Menu */}
                <Menu
                    anchorEl={notificationAnchorEl}
                    open={Boolean(notificationAnchorEl)}
                    onClose={handleNotificationClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        style: {
                            width: '400px',
                            maxHeight: '500px',
                        },
                    }}
                >
                    <div className="p-2">
                        <div className="flex justify-between items-center px-2 py-1 border-b">
                            <h3 className="font-bold">Recent Task Notifications</h3>
                            {unseenNotifications.length > 0 && (
                                <Button
                                    size="small"
                                    onClick={clearAllNotifications}
                                    color="secondary"
                                >
                                    Clear All
                                </Button>
                            )}
                        </div>

                        {unseenNotifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No new notifications
                            </div>
                        ) : (
                            <List dense>
                                <AnimatePresence>
                                    {unseenNotifications.map((task) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ListItem
                                                button
                                                onClick={() => {
                                                    navigate(`/viewemployeetaskdetails/${task.id}`);
                                                    handleNotificationClose();
                                                }}
                                            >
                                                <ListItemText
                                                    primary={task.title || "New Task"}
                                                    secondary={task.description || "Click to view details"}
                                                    secondaryTypographyProps={{ noWrap: true }}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="remove"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeNotification(task.id);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </List>
                        )}
                    </div>
                </Menu>

                {tasks.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No tasks assigned yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => {
                            const { isOverdue, isDueToday } = compareDates(task.dueDate);
                            const taskIsOverdue = isOverdue && task.taskStatus !== 'COMPLETED';
                            const taskIsDueToday = isDueToday && task.taskStatus !== 'COMPLETED';

                            return (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div
                                        className={`bg-white rounded-lg shadow-md overflow-hidden relative ${taskIsOverdue ? 'border-l-4 border-red-500' :
                                            taskIsDueToday ? 'border-l-4 border-yellow-500' : ''
                                            }`}
                                    >
                                        {taskIsOverdue && (
                                            <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                OVERDUE
                                            </div>
                                        )}
                                        {taskIsDueToday && !taskIsOverdue && (
                                            <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                DUE TODAY
                                            </div>
                                        )}

                                        <div className="p-4">
                                            <h2 className={`text-xl font-bold mb-2 ${taskIsOverdue ? 'text-red-600' :
                                                taskIsDueToday ? 'text-yellow-600' : 'text-blue-600'
                                                }`}>
                                                {task.title}
                                            </h2>
                                            <p className="text-gray-700 mb-3">{task.description}</p>

                                            <div className="border-t border-gray-200 my-2"></div>

                                            <div className="grid grid-cols-2 gap-2 mb-3">
                                                <div>
                                                    <span className="text-gray-600">Start Date:</span>
                                                    <span className="font-semibold ml-1">{formatDate(task.startDate)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Due Date:</span>
                                                    <span className={`font-semibold ml-1 ${taskIsOverdue ? 'text-red-600' :
                                                        taskIsDueToday ? 'text-yellow-600' : ''
                                                        }`}>
                                                        {formatDate(task.dueDate)}
                                                    </span>
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

                                            <div className="flex justify-end space-x-2 mt-3">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => navigate(`/viewemployeetaskdetails/${task.id}`)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="secondary"
                                                    onClick={(e) => handleMenuOpen(e, task.id)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Task Status Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleStatusUpdate('PENDING')}>Mark as Pending</MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('INPROGRESS')}>Mark as In Progress</MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('COMPLETED')}>Mark as Completed</MenuItem>
            </Menu>

            {/* Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>

            {/* Welcome Popup for Today's Tasks */}
            <Dialog open={showWelcomePopup} onClose={() => setShowWelcomePopup(false)}>
                <DialogTitle>New Tasks Assigned Today</DialogTitle>
                <DialogContent dividers>
                    {todaysTasks.map((task) => (
                        <div key={task.id} className="mb-4">
                            <h2 className="text-lg font-semibold">{task.title}</h2>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowWelcomePopup(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EmployeeDashboard;