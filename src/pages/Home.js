import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ about, projects }) => {
  return (
    <div className="home">
      {about && (
        <section className="hero">
          <div className="hero-content">
            <h1>{about.name}</h1>
            <h2>{about.title}</h2>
            <p>{about.bio}</p>
            <Link to="/about" className="btn">Selengkapnya...</Link>
          </div>
          {about.image_url && (
            <div className="hero-image">
              <img src={about.image_url} alt={about.name} />
            </div>
          )}
        </section>
      )}
      
      <section className="featured-projects">
        <h2>Projek Sedang Dikerjakan</h2>
        <div className="projects-grid">
          {projects.slice(0, 3).map(project => (
            <div key={project.id} className="project-card">
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="project-image" />
              )}
              <h3>{project.title}</h3>
              <p>{project.description.substring(0, 100)}...</p>
              <Link to={`/projects/${project.id}`} className="btn">Lihat Projek</Link>
            </div>
          ))}
        </div>
        <Link to="/projects" className="btn view-all">Lihat semua projek</Link>
      </section>
    </div>
  );
};

export default Home;