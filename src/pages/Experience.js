import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faBriefcase, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get('/api/experiences');
        setExperiences(res.data);
      } catch (err) {
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiences();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="experience-page">
      <div className="experience-header">
        <h1>My Work Experience</h1>
        <p>Professional journey and projects I've worked on</p>
      </div>
      
      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading experiences...</p>
        </div>
      ) : experiences.length === 0 ? (
        <div className="empty-box">
          <p>No work experience found</p>
        </div>
      ) : (
        <div className="experience-box-container">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-box">
              <div className="box-header">
                <div className="company-icon">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div className="company-info">
                  <h2>{exp.company}</h2>
                  <h3>{exp.position}</h3>
                </div>
              </div>
              
              <div className="box-content">
                <div className="detail-row">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <span>{formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date)}</span>
                </div>
                
                {exp.description && exp.description.includes('Lokasi') && (
                  <div className="detail-row">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{exp.description.split('Lokasi :')[1].split('\n')[0].trim()}</span>
                  </div>
                )}
                
                {exp.description && (
                  <div className="description-box">
                    {exp.description.split('\n')
                      .filter(p => !p.includes('Lokasi'))
                      .map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;