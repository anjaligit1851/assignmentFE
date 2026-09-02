import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Folder, Plus, LogOut } from 'lucide-react';
import { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure } from '../features/projects/projectsSlice';
import { logout } from '../features/auth/authSlice';

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    const loadProjects = async () => {
      dispatch(fetchProjectsStart());
      try {
        // Mock data for demo purposes since backend isn't connected
        const mockProjects = [
          { _id: '1', name: 'Website Redesign', description: 'Overhaul corporate website with new branding', taskCount: 12 },
          { _id: '2', name: 'Mobile App V2', description: 'React Native app for iOS and Android', taskCount: 8 },
          { _id: '3', name: 'Marketing Campaign Q3', description: 'Social media and email marketing assets', taskCount: 24 },
        ];
        
        setTimeout(() => {
          dispatch(fetchProjectsSuccess(mockProjects));
        }, 600);
      } catch (err) {
        dispatch(fetchProjectsFailure(err.message));
      }
    };
    
    loadProjects();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Select a project to view its task board</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary">
            <Plus size={18} /> New Project
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="loader" style={{ width: '40px', height: '40px', borderWidth: '4px' }}></div>
        </div>
      ) : error ? (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px' }}>
          Failed to load projects: {error}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="glass-panel" 
              style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onClick={() => navigate(`/projects/${project._id}/board`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.5rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: '8px' }}>
                  <Folder size={20} />
                </div>
                <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{project.name}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <span>{project.taskCount} tasks</span>
                <span style={{ color: 'var(--primary)', fontWeight: '500' }}>Open Board &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
