import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CourseModule from './pages/CourseModule';
import AdminDashboard from './pages/AdminDashboard';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseModule />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
