import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Experience from './pages/Experience';
import About from './pages/About';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await axios.get('/api/projects');
        setProjects(projectsRes.data);
        
        const aboutRes = await axios.get('/api/about');
        setAbout(aboutRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    
    fetchData();
  }, []);

  const addProject = async (project) => {
    try {
      const res = await axios.post('/api/projects', project);
      setProjects([...projects, res.data]);
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  const updateProject = async (id, updatedProject) => {
    try {
      await axios.put(`/api/projects/${id}`, updatedProject);
      setProjects(projects.map(project => 
        project.id === id ? updatedProject : project
      ));
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const updateAbout = async (aboutData) => {
    try {
      const res = await axios.put('/api/about', aboutData);
      setAbout(res.data);
    } catch (err) {
      console.error('Error updating about info:', err);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home about={about} projects={projects} />} />
            <Route path="/projects" element={<Projects projects={projects} />} />
            <Route path="/projects/:id" element={<ProjectDetail projects={projects} />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/about" element={<About about={about} />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/admin" 
              element={
                <Admin 
                  projects={projects} 
                  about={about} 
                  addProject={addProject} 
                  updateProject={updateProject} 
                  deleteProject={deleteProject}
                  updateAbout={updateAbout}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;