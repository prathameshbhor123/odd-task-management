// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Mock service functions - replace these with actual API calls in your implementation
// const AdminService = {
//   getTasks: async () => {
//     // Mock data - replace with actual API call
//     return [
//       {
//         id: 1,
//         title: 'Task 1',
//         description: 'Description for task 1',
//         dueDate: '2023-12-31',
//         employeeName: 'John Doe',
//         priority: 'High',
//         taskStatus: 'In Progress'
//       },
//       {
//         id: 2,
//         title: 'Task 2',
//         description: 'Description for task 2',
//         dueDate: '2023-11-15',
//         employeeName: 'Jane Smith',
//         priority: 'Medium',
//         taskStatus: 'Pending'
//       },
//       {
//         id: 3,
//         title: 'Task 3',
//         description: 'Description for task 3',
//         dueDate: '2023-10-20',
//         employeeName: 'Mike Johnson',
//         priority: 'Low',
//         taskStatus: 'Completed'
//       }
//     ];
//   },

//   searchTask: async (title) => {
//     // Mock search - replace with actual API call
//     const tasks = await AdminService.getTasks();
//     return tasks.filter(task =>
//       task.title.toLowerCase().includes(title.toLowerCase())
//     );
//   },

//   deleteTask: async (id) => {
//     // Mock delete - replace with actual API call
//     return { success: true };
//   }
// };

// // Notification component
// const Notification = ({ message, type, onClose }) => {
//   const bgColor = {
//     success: 'bg-green-500',
//     error: 'bg-red-500',
//     warning: 'bg-yellow-500',
//     info: 'bg-blue-500'
//   }[type] || 'bg-blue-500';

//   return (
//     <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg flex items-center justify-between min-w-[300px]`}>
//       <span>{message}</span>
//       <button
//         onClick={onClose}
//         className="ml-4 text-white hover:text-gray-200 focus:outline-none"
//         aria-label="Close notification"
//       >
//         ×
//       </button>
//     </div>
//   );
// };

// const AdminDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [notification, setNotification] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 5000);
//   };

//   const fetchTasks = async () => {
//     try {
//       const data = await AdminService.getTasks();
//       setTasks(data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       showNotification('Failed to fetch tasks', 'error');
//     }
//   };

//   const handleSearch = async (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     try {
//       if (term.trim() === '') {
//         fetchTasks();
//       } else {
//         const results = await AdminService.searchTask(term);
//         setTasks(results);
//       }
//     } catch (error) {
//       console.error('Error searching tasks:', error);
//       showNotification('Search failed', 'error');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await AdminService.deleteTask(id);
//       fetchTasks();
//       showNotification('Task deleted successfully', 'success');
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       showNotification('Failed to delete task', 'error');
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       {/* Notification */}
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       {/* Search Form */}
//       <div className="flex justify-center mt-5">
//         <div className="relative w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Enter keyword to Search"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </div>
//       </div>

//       {/* Task List */}
//       <div className="mt-8">
//         {tasks.length === 0 ? (
//           <div className="text-center py-10 text-gray-500">
//             No tasks found
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tasks.map((task) => (
//               <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                 <div className="p-6">
//                   <h2 className="text-xl font-bold text-blue-600 mb-2">{task.title}</h2>
//                   <p className="text-gray-700 mb-4">{task.description}</p>

//                   <div className="border-t border-b border-gray-200 my-4"></div>

//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="flex items-center">
//                       <span className="text-gray-600 mr-2">Due Date:</span>
//                       <span className="font-semibold">{formatDate(task.dueDate)}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span className="text-gray-600 mr-2">Employee:</span>
//                       <span className="font-semibold">{task.employeeName}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span className="text-gray-600 mr-2">Priority:</span>
//                       <span className="font-semibold">{task.priority}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span className="text-gray-600 mr-2">Status:</span>
//                       <span className="font-semibold">{task.taskStatus}</span>
//                     </div>
//                   </div>

//                   <div className="border-t border-b border-gray-200 my-4"></div>

//                   <div className="flex justify-end space-x-2">
//                     <button
//                       onClick={() => {
//                         console.log("Task ID:", task.id); // Debug
//                         navigate(`/viewtaskdetails/${task.id}`);
//                       }}
//                       className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
//                       aria-label="View"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => {
//                         console.log("Task ID:", task.id); // Debug
//                         navigate(`/updatetask/${task.id}`);
//                       }}
//                       className="p-2 text-green-500 hover:bg-green-50 rounded-full"
//                       aria-label="Edit"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(task.id)}
//                       className="p-2 text-red-500 hover:bg-red-50 rounded-full"
//                       aria-label="Delete"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getTasks();
      setTasks(data);
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Search Form */}
      <div className="flex justify-center mt-5">
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

      {/* Task List */}
      <div className="mt-8">
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No tasks found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-blue-600 mb-2">{task.title}</h2>
                  <p className="text-gray-700 mb-4">{task.description}</p>

                  <div className="border-t border-b border-gray-200 my-4"></div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
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