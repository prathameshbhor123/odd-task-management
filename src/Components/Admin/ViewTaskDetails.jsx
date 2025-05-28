// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

// const ViewTaskDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//     const [taskData, setTaskData] = useState(null);
//     const [comments, setComments] = useState([]);

//     // Mock API calls - replace with real API calls in production
//     const getTaskById = async () => {
//         console.log(`Fetching task with id: ${id}`);
//         // Mock response
//         setTimeout(() => {
//             setTaskData({
//                 title: 'Sample Task',
//                 description: 'This is a sample task description',
//                 dueDate: new Date(Date.now() + 86400000),
//                 employeeName: 'John Doe',
//                 priority: 'MEDIUM',
//                 taskStatus: 'PENDING'
//             });
//         }, 500);
//     };

//     const getCommentsByTask = async () => {
//         console.log(`Fetching comments for task id: ${id}`);
//         // Mock response
//         setTimeout(() => {
//             setComments([
//                 { id: 1, postedName: 'User 1', content: 'First comment', createdAt: new Date() },
//                 { id: 2, postedName: 'User 2', content: 'Second comment', createdAt: new Date(Date.now() - 3600000) }
//             ]);
//         }, 500);
//     };

//     const createComment = async (content) => {
//         console.log(`Creating comment for task ${id}: ${content}`);
//         // Mock response
//         setTimeout(() => {
//             setSnackbar({ open: true, message: 'Comment published successfully', severity: 'success' });
//             getCommentsByTask();
//             reset();
//         }, 500);
//     };

//     useEffect(() => {
//         if (id) {
//             getTaskById();
//             getCommentsByTask();
//         }
//     }, [id]);

//     const onSubmit = (data) => {
//         createComment(data.content);
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar({ ...snackbar, open: false });
//     };

//     if (!taskData) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//             {/* Task Details Card */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold text-blue-600 mb-3">{taskData.title}</h2>
//                     <p className="text-gray-700 mb-4">{taskData.description}</p>

//                     <div className="border-t border-gray-200 my-4"></div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Due Date:</span>
//                             <span className="font-semibold">
//                                 {new Date(taskData.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                             </span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Employee:</span>
//                             <span className="font-semibold">{taskData.employeeName}</span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Priority:</span>
//                             <span className="font-semibold">{taskData.priority}</span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Status:</span>
//                             <span className="font-semibold">{taskData.taskStatus}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Comment Form */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//                 <div className="p-6">
//                     <h4 className="text-lg font-semibold mb-4">Publish your Comment</h4>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="mb-4">
//                             <label htmlFor="content" className="block text-gray-700 mb-2">Content</label>
//                             <textarea
//                                 id="content"
//                                 {...register('content', { required: 'Content is required' })}
//                                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
//                                 rows={4}
//                             ></textarea>
//                             {errors.content && (
//                                 <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
//                             )}
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                                 disabled={errors.content}
//                             >
//                                 Publish Comment
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* Comments Section */}
//             <div>
//                 <h4 className="text-lg font-semibold mb-4">Comments</h4>
//                 {comments.length === 0 ? (
//                     <p className="text-gray-500">No comments yet</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {comments.map((comment) => (
//                             <div key={comment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                                 <div className="p-4">
//                                     <div className="flex items-center mb-2">
//                                         <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden">
//                                             <img
//                                                 src="https://material.angular.io/assets/img/examples/shiba1.jpg"
//                                                 alt="avatar"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                         <div>
//                                             <h5 className="font-semibold">{comment.postedName}</h5>
//                                             <p className="text-sm text-gray-500">
//                                                 {new Date(comment.createdAt).toLocaleString('en-US', {
//                                                     month: 'short',
//                                                     day: 'numeric',
//                                                     year: 'numeric',
//                                                     hour: '2-digit',
//                                                     minute: '2-digit'
//                                                 })}
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <p className="text-gray-700 ml-13">{comment.content}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Snackbar Notification */}
//             {snackbar.open && (
//                 <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg ${snackbar.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {snackbar.message}
//                     <button
//                         onClick={handleCloseSnackbar}
//                         className="ml-4 font-bold focus:outline-none"
//                     >
//                         ×
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewTaskDetails;






// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

// const ViewTaskDetails = () => {
//     const { id } = useParams();
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//     const [taskData, setTaskData] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     // Mock API calls
//     const getTaskById = async () => {
//         try {
//             // Simulate API delay
//             await new Promise(resolve => setTimeout(resolve, 500));

//             // Mock response data
//             const mockTaskData = {
//                 title: 'Website Redesign Project',
//                 description: 'Complete the redesign of company website with new branding elements',
//                 dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
//                 employeeName: 'John Doe',
//                 priority: 'HIGH',
//                 taskStatus: 'INPROGRESS'
//             };

//             setTaskData(mockTaskData);
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching task:', error);
//             setIsLoading(false);
//         }
//     };

//     const getCommentsByTask = async () => {
//         try {
//             // Simulate API delay
//             await new Promise(resolve => setTimeout(resolve, 500));

//             // Mock comments data
//             const mockComments = [
//                 {
//                     id: 1,
//                     postedName: 'Jane Smith',
//                     content: 'I\'ve completed the homepage design',
//                     createdAt: new Date(Date.now() - 86400000) // 1 day ago
//                 },
//                 {
//                     id: 2,
//                     postedName: 'John Doe',
//                     content: 'Please review the color scheme',
//                     createdAt: new Date()
//                 }
//             ];

//             setComments(mockComments);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//         }
//     };

//     const createComment = async (content) => {
//         try {
//             // Simulate API delay
//             await new Promise(resolve => setTimeout(resolve, 500));

//             // Mock new comment
//             const newComment = {
//                 id: comments.length + 1,
//                 postedName: 'Current User',
//                 content,
//                 createdAt: new Date()
//             };

//             setComments([...comments, newComment]);
//             setSnackbar({
//                 open: true,
//                 message: 'Comment published successfully',
//                 severity: 'success'
//             });
//             reset();
//         } catch (error) {
//             console.error('Error creating comment:', error);
//             setSnackbar({
//                 open: true,
//                 message: 'Failed to publish comment',
//                 severity: 'error'
//             });
//         }
//     };

//     useEffect(() => {
//         if (id) {
//             getTaskById();
//             getCommentsByTask();
//         }
//     }, [id]);

//     const onSubmit = (data) => {
//         createComment(data.content);
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar({ ...snackbar, open: false });
//     };

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//             {/* Task Details Card */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold text-blue-600 mb-3">{taskData.title}</h2>
//                     <p className="text-gray-700 mb-4">{taskData.description}</p>

//                     <div className="border-t border-gray-200 my-4"></div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Due Date:</span>
//                             <span className="font-semibold">
//                                 {new Date(taskData.dueDate).toLocaleDateString('en-US', {
//                                     month: 'short',
//                                     day: 'numeric',
//                                     year: 'numeric'
//                                 })}
//                             </span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Employee:</span>
//                             <span className="font-semibold">{taskData.employeeName}</span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Priority:</span>
//                             <span className="font-semibold">
//                                 <span className={`px-2 py-1 rounded-full text-xs ${taskData.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
//                                         taskData.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
//                                             'bg-green-100 text-green-800'
//                                     }`}>
//                                     {taskData.priority}
//                                 </span>
//                             </span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Status:</span>
//                             <span className="font-semibold">
//                                 <span className={`px-2 py-1 rounded-full text-xs ${taskData.taskStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
//                                         taskData.taskStatus === 'INPROGRESS' ? 'bg-blue-100 text-blue-800' :
//                                             'bg-gray-100 text-gray-800'
//                                     }`}>
//                                     {taskData.taskStatus}
//                                 </span>
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Comment Form */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//                 <div className="p-6">
//                     <h4 className="text-lg font-semibold mb-4">Publish your Comment</h4>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="mb-4">
//                             <label htmlFor="content" className="block text-gray-700 mb-2">Content</label>
//                             <textarea
//                                 id="content"
//                                 {...register('content', { required: 'Content is required' })}
//                                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'
//                                     }`}
//                                 rows={4}
//                             ></textarea>
//                             {errors.content && (
//                                 <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
//                             )}
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                                 disabled={!!errors.content}
//                             >
//                                 Publish Comment
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* Comments Section */}
//             <div>
//                 <h4 className="text-lg font-semibold mb-4">Comments ({comments.length})</h4>
//                 {comments.length === 0 ? (
//                     <p className="text-gray-500">No comments yet. Be the first to comment!</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {comments.map((comment) => (
//                             <div key={comment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                                 <div className="p-4">
//                                     <div className="flex items-start mb-2">
//                                         <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden">
//                                             <img
//                                                 src={`https://i.pravatar.cc/150?u=${comment.postedName}`}
//                                                 alt="avatar"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                         <div className="flex-1">
//                                             <div className="flex justify-between items-start">
//                                                 <div>
//                                                     <h5 className="font-semibold">{comment.postedName}</h5>
//                                                     <p className="text-sm text-gray-500">
//                                                         {new Date(comment.createdAt).toLocaleString('en-US', {
//                                                             month: 'short',
//                                                             day: 'numeric',
//                                                             year: 'numeric',
//                                                             hour: '2-digit',
//                                                             minute: '2-digit'
//                                                         })}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700 mt-2">{comment.content}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Snackbar Notification */}
//             {snackbar.open && (
//                 <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center ${snackbar.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                     <span>{snackbar.message}</span>
//                     <button
//                         onClick={handleCloseSnackbar}
//                         className="ml-4 font-bold focus:outline-none"
//                     >
//                         ×
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewTaskDetails;








// 








// 







// 









// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// // API Configuration
// const API_BASE_URL = 'http://localhost:8080/api'; // Update with your actual API base URL
// const TASK_API_URL = `${API_BASE_URL}/admin/task`;
// const COMMENT_API_URL = `${API_BASE_URL}/admin/task/comment`;

// const ViewTaskDetails = () => {
//     const { id } = useParams();
//     const taskId = id;
//     const postedBy = id;

//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//     const [taskData, setTaskData] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     // Configure axios instance with base URL and default headers
//     const api = axios.create({
//         baseURL: API_BASE_URL,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     });

//     const getTaskById = async () => {
//         try {
//             const response = await api.get(`${TASK_API_URL}/${taskId}`);
//             setTaskData(response.data);
//         } catch (error) {
//             console.error('Error fetching task:', error);
//             showSnackbar('Error fetching task details', 'error');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const getCommentsByTask = async () => {
//         try {
//             const response = await api.get(`${TASK_API_URL}/${taskId}/comments`);
//             setComments(response.data);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//             showSnackbar('Error fetching comments', 'error');
//         }
//     };

//     const createComment = async (data) => {
//         console.log("Data passed to createComment:", data);
//         try {

//             const content = data.content;


//             const url = `${COMMENT_API_URL}?taskId=${taskId}&postedBy=${postedBy}`;
//             console.log('Posting comment to:', url);

//             const response = await axios.post(url, content, {
//                 headers: { 'Content-Type': 'text/plain' }
//             });

//             setComments([...comments, response.data]);
//             showSnackbar('Comment published successfully', 'success');
//             reset();
//         } catch (error) {
//             console.error('Error creating comment:', error);
//             showSnackbar(error.response?.data?.message || 'Failed to publish comment', 'error');
//         }
//     };

//     const showSnackbar = (message, severity) => {
//         setSnackbar({ open: true, message, severity });
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     useEffect(() => {
//         getTaskById();
//         getCommentsByTask();
//     }, [taskId]); // Added taskId as dependency to refetch when it changes

//     const onSubmit = (data) => {
//         console.log("Form Data:", data);
//         createComment(data);
//     };

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//             {/* Task Details Card */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 mt-20">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold text-blue-600 mb-3">{taskData?.title}</h2>
//                     <p className="text-gray-700 mb-4">{taskData?.description}</p>

//                     <div className="border-t border-gray-200 my-4"></div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Due Date:</span>
//                             <span className="font-semibold">
//                                 {taskData?.dueDate && new Date(taskData.dueDate).toLocaleDateString('en-US', {
//                                     month: 'short',
//                                     day: 'numeric',
//                                     year: 'numeric'
//                                 })}
//                             </span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Employee:</span>
//                             <span className="font-semibold">{taskData?.employeeName}</span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Priority:</span>
//                             <span className="font-semibold">
//                                 <span className={`px-2 py-1 rounded-full text-xs ${taskData?.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
//                                     taskData?.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
//                                         'bg-green-100 text-green-800'
//                                     }`}>
//                                     {taskData?.priority}
//                                 </span>
//                             </span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Status:</span>
//                             <span className="font-semibold">
//                                 <span className={`px-2 py-1 rounded-full text-xs ${taskData?.taskStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
//                                     taskData?.taskStatus === 'INPROGRESS' ? 'bg-blue-100 text-blue-800' :
//                                         'bg-gray-100 text-gray-800'
//                                     }`}>
//                                     {taskData?.taskStatus}
//                                 </span>
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Comment Form */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//                 <div className="p-6">
//                     <h4 className="text-lg font-semibold mb-4">Publish your Comment</h4>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="mb-4">
//                             <label htmlFor="content" className="block text-gray-700 mb-2">Content</label>
//                             <textarea
//                                 id="content"
//                                 {...register('content', { required: 'Content is required' })}
//                                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
//                                 rows={4}
//                             ></textarea>
//                             {errors.content && (
//                                 <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
//                             )}
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                             >
//                                 Publish Comment
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* Comments Section */}
//             <div>
//                 <h4 className="text-lg font-semibold mb-4">Comments ({comments.length})</h4>
//                 {comments.length === 0 ? (
//                     <p className="text-gray-500">No comments yet. Be the first to comment!</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {comments.map((comment) => (
//                             <div key={comment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                                 <div className="p-4">
//                                     <div className="flex items-start mb-2">
//                                         <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden">
//                                             <img
//                                                 src={`https://i.pravatar.cc/150?u=${comment.postedName}`}
//                                                 alt="avatar"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                         <div className="flex-1">
//                                             <div className="flex justify-between items-start">
//                                                 <div>
//                                                     <h5 className="font-semibold">{comment.postedName}</h5>
//                                                     <p className="text-sm text-gray-500">
//                                                         {comment.createdAt && new Date(comment.createdAt).toLocaleString('en-US', {
//                                                             month: 'short',
//                                                             day: 'numeric',
//                                                             year: 'numeric',
//                                                             hour: '2-digit',
//                                                             minute: '2-digit'
//                                                         })}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700 mt-2">{comment.content}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Snackbar Notification */}
//             {snackbar.open && (
//                 <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center ${snackbar.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     <span>{snackbar.message}</span>
//                     <button
//                         onClick={handleCloseSnackbar}
//                         className="ml-4 font-bold focus:outline-none"
//                     >
//                         ×
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewTaskDetails;









import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
const TASK_API_URL = `${API_BASE_URL}/admin/task`;
const COMMENT_API_URL = `${API_BASE_URL}/admin/task/comment`;

const ViewTaskDetails = () => {
    const { id } = useParams(); // Task ID from URL
    const taskId = id;

    const postedBy = 1; // Get userId securely (must be set in login)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [taskData, setTaskData] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    const getTaskById = async () => {
        try {
            const response = await api.get(`${TASK_API_URL}/${taskId}`);
            setTaskData(response.data);
        } catch (error) {
            console.error('Error fetching task:', error);
            showSnackbar('Error fetching task details', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const getCommentsByTask = async () => {
        try {
            const response = await api.get(`${TASK_API_URL}/${taskId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            showSnackbar('Error fetching comments', 'error');
        }
    };

    const createComment = async (data) => {
        try {
            const content = data.content;
            const url = `${COMMENT_API_URL}?taskId=${taskId}&postedBy=${postedBy}`;
            const response = await api.post(url, content, {
                headers: { 'Content-Type': 'text/plain' }
            });

            setComments([...comments, response.data]);
            showSnackbar('Comment published successfully', 'success');
            reset();
        } catch (error) {
            console.error('Error creating comment:', error);
            showSnackbar(error.response?.data?.message || 'Failed to publish comment', 'error');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    useEffect(() => {
        getTaskById();
        getCommentsByTask();
    }, [taskId]);

    const onSubmit = (data) => {
        createComment(data);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Task Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 mt-20">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-3">{taskData?.title}</h2>
                    <p className="text-gray-700 mb-4">{taskData?.description}</p>

                    <div className="border-t border-gray-200 my-4"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Due Date:</span>
                            <span className="font-semibold">
                                {taskData?.dueDate && new Date(taskData.dueDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Employee:</span>
                            <span className="font-semibold">{taskData?.employeeName}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Priority:</span>
                            <span className="font-semibold">
                                <span className={`px-2 py-1 rounded-full text-xs ${taskData?.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                    taskData?.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'}`}>
                                    {taskData?.priority}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Status:</span>
                            <span className="font-semibold">
                                <span className={`px-2 py-1 rounded-full text-xs ${taskData?.taskStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                    taskData?.taskStatus === 'INPROGRESS' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'}`}>
                                    {taskData?.taskStatus}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment Form */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4">Publish your Comment</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 mb-2">Content</label>
                            <textarea
                                id="content"
                                {...register('content', { required: 'Content is required' })}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                rows={4}
                            ></textarea>
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                Publish Comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Comments */}
            <div>
                <h4 className="text-lg font-semibold mb-4">Comments ({comments.length})</h4>
                {comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-start mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden">
                                            <img
                                                src={`https://i.pravatar.cc/150?u=${comment.postedName}`}
                                                alt="avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h5 className="font-semibold">{comment.postedName}</h5>
                                                    <p className="text-sm text-gray-500">
                                                        {comment.createdAt && new Date(comment.createdAt).toLocaleString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 mt-2">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Snackbar */}
            {snackbar.open && (
                <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center ${snackbar.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    <span>{snackbar.message}</span>
                    <button
                        onClick={handleCloseSnackbar}
                        className="ml-4 font-bold focus:outline-none"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );

};

export default ViewTaskDetails;
