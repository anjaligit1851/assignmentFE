import api from './api';

export const taskService = {
  getTasksByProject: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/tasks`);
    return response.data;
  },
  createTask: async (projectId, taskData) => {
    const response = await api.post(`/projects/${projectId}/tasks`, taskData);
    return response.data;
  },
  updateTaskStatus: async (taskId, status) => {
    const response = await api.patch(`/tasks/${taskId}`, { status });
    return response.data;
  },
};
