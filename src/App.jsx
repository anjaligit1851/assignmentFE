import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProjectList from './pages/ProjectList';
import TaskBoard from './pages/TaskBoard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/projects" 
          element={
            <PrivateRoute>
              <ProjectList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/projects/:projectId/board" 
          element={
            <PrivateRoute>
              <TaskBoard />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/projects" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
