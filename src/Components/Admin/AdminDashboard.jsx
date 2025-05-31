import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file
import { set } from 'date-fns';


const API_BASE_URL = 'http://localhost:8080/api/admin'; // Replace with your actual API base URL

const AdminService = {
  getTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use token-based auth
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  searchTask: async (title) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/search/{title}{encodeURIComponent(title)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching tasks:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Check if response has content before parsing as JSON
      const contentLength = response.headers.get('content-length');
      if (contentLength && contentLength !== '0') {
        return await response.json();
      } else {
        return { success: true }; // Return success object if no content
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

// Notification component (same as before)
const Notification = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type] || 'bg-blue-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg flex items-center justify-between min-w-[300px]`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [startDateFilter, setStartDateFilter] = useState("");
  const [sortOption, setSortOption] = useState('');
  const [allTasks, setAllTasks] = useState([]);

  // Date filter states
  const [startDateRange, setStartDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection'
  });

  const [dueDateRange, setDueDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection'
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);



  useEffect(() => {
    fetchTasks();
  }, []);

  const sortTasks = (tasks, option) => {
    if (option === 'dueDate' || option === 'startDate') {
      return [...tasks].sort((a, b) => new Date(a[option]) - new Date(b[option]));
    }
    return tasks;
  };



  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getTasks();
      const sortedData = data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setAllTasks(data);
      setTasks(sortTasks(sortedData, sortOption));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      showNotification('Failed to fetch tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  };


  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      if (term.trim() === '') {
        await fetchTasks();
      } else {
        setIsLoading(true);
        const results = await AdminService.searchTask(term);
        setTasks(results);
      }
    } catch (error) {
      console.error('Error searching tasks:', error);
      showNotification('Search failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };


  const handleDateFilter = async (selectedDate) => {
    setStartDateFilter(selectedDate);
    setIsLoading(true);

    try {
      const allTasks = await AdminService.getTasks();

      if (!selectedDate) {
        setTasks(allTasks);
      } else {
        const filtered = allTasks.filter((task) => {
          const taskDate = new Date(task.startDate).toLocaleDateString("en-CA");

          return taskDate === selectedDate;
        });
        setTasks(filtered);
      }
    } catch (error) {
      showNotification("Error filtering tasks by date", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await AdminService.deleteTask(id);
      await fetchTasks();
      showNotification('Task deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting task:', error);
      showNotification('Failed to delete task', 'error');
    }
  };







  useEffect(() => {
    if (allTasks.length > 0) {
      applyFilters();
    }
  }, [startDateRange, dueDateRange, allTasks]);

  const applyFilters = () => {
    let filteredTasks = [...allTasks];

    // Apply start date filter
    if (startDateRange.startDate && startDateRange.endDate) {
      const startStart = new Date(startDateRange.startDate);
      const startEnd = new Date(startDateRange.endDate);
      startEnd.setHours(23, 59, 59, 999);

      filteredTasks = filteredTasks.filter(task => {
        const taskStart = new Date(task.startDate);
        return taskStart >= startStart && taskStart <= startEnd;
      });
    }

    // Apply due date filter
    if (dueDateRange.startDate && dueDateRange.endDate) {
      const dueStart = new Date(dueDateRange.startDate);
      const dueEnd = new Date(dueDateRange.endDate);
      dueEnd.setHours(23, 59, 59, 999);

      filteredTasks = filteredTasks.filter(task => {
        const taskDue = new Date(task.dueDate);
        return taskDue >= dueStart && taskDue <= dueEnd;
      });
    }

    setTasks(sortTasks(filteredTasks, sortOption));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatRangeDisplay = (startDate, endDate) => {
    if (!startDate || !endDate) return 'Select date range';

    const format = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    if (startDate.toDateString() === endDate.toDateString()) {
      return format(startDate);
    }
    return `${format(startDate)} - ${format(endDate)}`;
  };
  const handleClearFilters = () => {
    setStartDateRange({
      startDate: null,
      endDate: null,
      key: 'selection'
    });

    setDueDateRange({
      startDate: null,
      endDate: null,
      key: 'selection'
    });

    setTasks(allTasks);
  };

  return (<div className="min-h-screen bg-gray-50 p-4">
    {notification && (
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(null)}
      />
    )}

    {/* Search Form */}
    <div className="flex justify-center mt-5 px-2">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Enter keyword to Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>

    {/* Filters Section */}
    <div className="flex flex-col sm:flex-row sm:items-center  gap-4 mb-4 mt-6 px-2">
      <h1 className="text-xl font-semibold">All Tasks</h1>

      <div className="flex flex-wrap items-center gap-4 justify-between">
        {/* Start Date Filter */}
        <div className="relative">
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setShowStartDatePicker(!showStartDatePicker)}
          >
            Start Date: {formatRangeDisplay(startDateRange.startDate, startDateRange.endDate)}
          </button>

          {showStartDatePicker && (
            <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md left-0 max-w-[90vw] overflow-x-auto">
              <DateRangePicker
                ranges={[startDateRange]}
                onChange={item => {
                  setStartDateRange(item.selection);
                  setShowStartDatePicker(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Due Date Filter */}
        <div className="relative">
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setShowDueDatePicker(!showDueDatePicker)}
          >
            Due Date: {formatRangeDisplay(dueDateRange.startDate, dueDateRange.endDate)}
          </button>

          {showDueDatePicker && (
            <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md left-0 max-w-[90vw] overflow-x-auto">
              <DateRangePicker
                ranges={[dueDateRange]}
                onChange={item => {
                  setDueDateRange(item.selection);
                  setShowDueDatePicker(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Clear Filter Button */}
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>

    {/* Task List */}
    <div className="mt-8 px-2">
      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No tasks found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{task.title}</h2>
                <p className="text-gray-700 mb-4">{task.description}</p>

                <div className="border-t border-b border-gray-200 my-4"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold ml-1">{formatDate(task.startDate)}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Due Date:</span>
                    <span className="font-semibold">{formatDate(task.dueDate)}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Employee:</span>
                    <span className="font-semibold">{task.employeeName}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Priority:</span>
                    <span className="font-semibold">{task.priority}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Status:</span>
                    <span className="font-semibold">{task.taskStatus}</span>
                  </div>
                </div>

                <div className="border-t border-b border-gray-200 my-4"></div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => navigate(`/viewtaskdetails/${task.id}`)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    aria-label="View"
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigate(`/updatetask/${task.id}`)}
                    className="p-2 text-green-500 hover:bg-green-50 rounded-full"
                    aria-label="Edit"
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    aria-label="Delete"
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default AdminDashboard;