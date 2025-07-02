import React from 'react';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
  return (
    <div className="projects-page">
      <h1>My Projects</h1>
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-item">
            <div className="project-info">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              {project.tags && (
                <div className="tags">
                  {project.tags.split(',').map((tag, index) => (
                    <span key={index} className="tag">{tag.trim()}</span>
                  ))}
                </div>
              )}
              <div className="project-links">
                <Link to={`/projects/${project.id}`} className="btn">Selengkapnya</Link>
                {project.project_url && (
                  <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="btn">
                    Lihat Projek
                  </a>
                )}
              </div>
            </div>
            {project.image_url && (
              <div className="project-image">
                <img src={project.image_url} alt={project.title} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;