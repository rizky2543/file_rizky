import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return <div>Projek kosong</div>;
  }

  return (
    <div className="project-detail">
      <h1>{project.title}</h1>
      {project.image_url && (
        <img src={project.image_url} alt={project.title} className="project-detail-image" />
      )}
      <p className="project-description">{project.description}</p>
      
      {project.tags && (
        <div className="tags">
          {project.tags.split(',').map((tag, index) => (
            <span key={index} className="tag">{tag.trim()}</span>
          ))}
        </div>
      )}
      
      {project.project_url && (
        <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="btn">
          lihat Projek
        </a>
      )}
    </div>
  );
};

export default ProjectDetail;