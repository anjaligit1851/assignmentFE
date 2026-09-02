import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Plus } from 'lucide-react';
import { fetchTasksStart, fetchTasksSuccess, fetchTasksFailure, updateTask } from '../features/tasks/tasksSlice';
import { socketService } from '../services/socketService';

const TaskBoard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    // 1. Fetch initial tasks for this project
    const loadTasks = async () => {
      dispatch(fetchTasksStart());
      try {
        // Mock data
        const mockTasks = [
          { _id: 't1', title: 'Design System', description: 'Create typography and color tokens', status: 'TODO', projectId },
          { _id: 't2', title: 'Authentication API', description: 'Implement JWT login/register', status: 'IN_PROGRESS', projectId },
          { _id: 't3', title: 'Database Schema', description: 'Design MongoDB collections', status: 'DONE', projectId },
        ];
        setTimeout(() => {
          dispatch(fetchTasksSuccess(mockTasks));
        }, 500);
      } catch (err) {
        dispatch(fetchTasksFailure(err.message));
      }
    };
    
    loadTasks();

    // 2. Connect to socket and join project room
    socketService.connect(dispatch);
    socketService.joinProject(projectId);

    // 3. Cleanup on unmount
    return () => {
      socketService.leaveProject(projectId);
      socketService.disconnect();
    };
  }, [projectId, dispatch]);

  const handleStatusChange = (taskId, newStatus) => {
    // Optimistic UI update
    const task = tasks.find(t => t._id === taskId);
    if (task && task.status !== newStatus) {
      const updatedTask = { ...task, status: newStatus };
      dispatch(updateTask(updatedTask));
      
      // In a real app, you would call taskService.updateTaskStatus(taskId, newStatus) here.
      // And the backend would emit 'taskUpdated' to all OTHER users in the room.
    }
  };

  const renderColumn = (title, status, className) => {
    const columnTasks = tasks.filter(t => t.status === status);
    
    return (
      <div className="column">
        <div className={`column-header ${className}`}>
          <span>{title}</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.875rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px' }}>
            {columnTasks.length}
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          {columnTasks.map(task => (
            <div key={task._id} className="task-card">
              <h4 className="task-title">{task.title}</h4>
              <p className="task-desc">{task.description}</p>
              
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                {status !== 'TODO' && (
                  <button 
                    onClick={() => handleStatusChange(task._id, 'TODO')}
                    style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Todo
                  </button>
                )}
                {status !== 'IN_PROGRESS' && (
                  <button 
                    onClick={() => handleStatusChange(task._id, 'IN_PROGRESS')}
                    style={{ background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Doing
                  </button>
                )}
                {status !== 'DONE' && (
                  <button 
                    onClick={() => handleStatusChange(task._id, 'DONE')}
                    style={{ background: 'none', border: '1px solid var(--done)', color: 'var(--done)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Done
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {status === 'TODO' && (
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', border: '1px dashed var(--border)', borderRadius: '8px', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '0.5rem' }}>
              <Plus size={16} /> Add Task
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loader" style={{ width: '40px', height: '40px', borderWidth: '4px' }}></div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '1400px' }}>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/projects')}
            style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="page-title" style={{ fontSize: '1.5rem' }}>Task Board</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Real-time updates across multiple users</p>
          </div>
        </div>
      </div>

      <div className="board-container">
        {renderColumn('To Do', 'TODO', 'todo')}
        {renderColumn('In Progress', 'IN_PROGRESS', 'in-progress')}
        {renderColumn('Done', 'DONE', 'done')}
      </div>
    </div>
  );
};

export default TaskBoard;
