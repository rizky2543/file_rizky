import React from 'react';

const About = ({ about }) => {
  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-text">
          <h1>Tentang Saya</h1>
          <h2>{about.name}</h2>
          <h3>{about.title}</h3>
          <p>{about.bio}</p>
          
          <div className="contact-info">
            {about.email && <p><strong>Email:</strong> {about.email}</p>}
            {about.phone && <p><strong>No. Telp:</strong> {about.phone}</p>}
            {about.location && <p><strong>Lokasi:</strong> {about.location}</p>}
          </div>
        </div>
        
        {about.image_url && (
          <div className="about-image">
            <img src={about.image_url} alt={about.name} />
          </div>
        )}
      </div>
    </div>
  );
};

export default About;