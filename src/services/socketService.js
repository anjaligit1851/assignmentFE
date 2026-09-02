import { io } from 'socket.io-client';
import { updateTask, addTask, deleteTask } from '../features/tasks/tasksSlice';

let socket = null;

export const socketService = {
  connect: (dispatch) => {
    const token = localStorage.getItem('token');
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    
    socket = io(socketUrl, {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    // Real-time event listeners
    socket.on('taskUpdated', (task) => {
      dispatch(updateTask(task));
    });

    socket.on('taskCreated', (task) => {
      dispatch(addTask(task));
    });

    socket.on('taskDeleted', (taskId) => {
      dispatch(deleteTask(taskId));
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  },
  joinProject: (projectId) => {
    if (socket) {
      socket.emit('joinProject', projectId);
    }
  },
  leaveProject: (projectId) => {
    if (socket) {
      socket.emit('leaveProject', projectId);
    }
  },
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
};
