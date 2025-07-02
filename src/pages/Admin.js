import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Admin = ({ 
  projects, 
  about, 
  addProject, 
  updateProject, 
  deleteProject, 
  updateAbout 
}) => {
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image_url: '',
    project_url: '',
    tags: ''
  });
  
  const [editProjectId, setEditProjectId] = useState(null);
  const [aboutForm, setAboutForm] = useState(about || {
    name: '',
    title: '',
    bio: '',
    image_url: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAboutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (editProjectId) {
      updateProject(editProjectId, { ...projectForm, id: editProjectId });
      setEditProjectId(null);
    } else {
      addProject(projectForm);
    }
    setProjectForm({
      title: '',
      description: '',
      image_url: '',
      project_url: '',
      tags: ''
    });
  };

  const [experiences, setExperiences] = useState([]);
const [experienceForm, setExperienceForm] = useState({
  company: '',
  position: '',
  description: '',
  start_date: '',
  end_date: '',
  is_current: false
});
const [editExperienceId, setEditExperienceId] = useState(null);

const fetchExperiences = async () => {
  try {
    const res = await axios.get('/api/experiences');
    setExperiences(res.data);
  } catch (err) {
    console.error('Error fetching experiences:', err);
  }
};

const addExperience = async (experience) => {
  try {
    const res = await axios.post('/api/experiences', experience);
    setExperiences([...experiences, res.data]);
  } catch (err) {
    console.error('Error adding experience:', err);
  }
};

const updateExperience = async (id, updatedExperience) => {
  try {
    await axios.put(`/api/experiences/${id}`, updatedExperience);
    setExperiences(experiences.map(exp => 
      exp.id === id ? updatedExperience : exp
    ));
  } catch (err) {
    console.error('Error updating experience:', err);
  }
};

const deleteExperience = async (id) => {
  try {
    await axios.delete(`/api/experiences/${id}`);
    setExperiences(experiences.filter(exp => exp.id !== id));
  } catch (err) {
    console.error('Error deleting experience:', err);
  }
};

const handleExperienceChange = (e) => {
  const { name, value, type, checked } = e.target;
  setExperienceForm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};

const handleExperienceSubmit = (e) => {
  e.preventDefault();
  if (editExperienceId) {
    updateExperience(editExperienceId, { ...experienceForm, id: editExperienceId });
    setEditExperienceId(null);
  } else {
    addExperience(experienceForm);
  }
  setExperienceForm({
    company: '',
    position: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false
  });
};

const handleEditExperience = (experience) => {
  setExperienceForm({
    company: experience.company,
    position: experience.position,
    description: experience.description,
    start_date: experience.start_date,
    end_date: experience.end_date,
    is_current: experience.is_current
  });
  setEditExperienceId(experience.id);
};

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    updateAbout(aboutForm);
  };

  const handleEditProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      project_url: project.project_url,
      tags: project.tags
    });
    setEditProjectId(project.id);
  };

  const [messages, setMessages] = useState([]);
const [showMessages, setShowMessages] = useState(false);

const fetchMessages = async () => {
  try {
    const res = await axios.get('/api/contact-messages');
    setMessages(res.data);
    setShowMessages(true);
  } catch (err) {
    console.error('Error fetching messages:', err);
  }
};

const markAsRead = async (id) => {
  try {
    await axios.put(`/api/contact-messages/${id}/mark-read`);
    setMessages(messages.map(msg => 
      msg.id === id ? {...msg, is_read: true} : msg
    ));
  } catch (err) {
    console.error('Error marking message as read:', err);
  }
};

const deleteMessage = async (id) => {
  try {
    await axios.delete(`/api/contact-messages/${id}`);
    setMessages(messages.filter(msg => msg.id !== id));
  } catch (err) {
    console.error('Error deleting message:', err);
  }
};

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      
      <section className="admin-section">
        <h2>Informasi</h2>
        <form onSubmit={handleAboutSubmit} className="admin-form">
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              name="name"
              value={aboutForm.name}
              onChange={handleAboutChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Judul</label>
            <input
              type="text"
              name="title"
              value={aboutForm.title}
              onChange={handleAboutChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={aboutForm.bio}
              onChange={handleAboutChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image_url"
              value={aboutForm.image_url}
              onChange={handleAboutChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={aboutForm.email}
              onChange={handleAboutChange}
            />
          </div>
          <div className="form-group">
            <label>No. Telp</label>
            <input
              type="text"
              name="phone"
              value={aboutForm.phone}
              onChange={handleAboutChange}
            />
          </div>
          <div className="form-group">
            <label>Alamat</label>
            <input
              type="text"
              name="location"
              value={aboutForm.location}
              onChange={handleAboutChange}
            />
          </div>
          <button type="submit" className="btn">simpan</button>
        </form>
      </section>
      
      <section className="admin-section">
        <h2>Projek</h2>
        <form onSubmit={handleProjectSubmit} className="admin-form">
          <div className="form-group">
            <label>Nama Projek</label>
            <input
              type="text"
              name="title"
              value={projectForm.title}
              onChange={handleProjectChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleProjectChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image_url"
              value={projectForm.image_url}
              onChange={handleProjectChange}
            />
          </div>
          <div className="form-group">
            <label>Alamat Projek</label>
            <input
              type="text"
              name="project_url"
              value={projectForm.project_url}
              onChange={handleProjectChange}
            />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              value={projectForm.tags}
              onChange={handleProjectChange}
            />
          </div>
          <button type="submit" className="btn">
            {editProjectId ? 'Update Project' : 'Add Project'}
          </button>
          {editProjectId && (
            <button 
              type="button" 
              className="btn cancel"
              onClick={() => {
                setEditProjectId(null);
                setProjectForm({
                  title: '',
                  description: '',
                  image_url: '',
                  project_url: '',
                  tags: ''
                });
              }}
            >
              Batal
            </button>
          )}
        </form>
        <div className="projects-list">
          {projects.map(project => (
            <div key={project.id} className="project-item">
              <h3>{project.title}</h3>
              <div className="project-actions">
                <button 
                  onClick={() => handleEditProject(project)}
                  className="btn-icon"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  onClick={() => deleteProject(project.id)}
                  className="btn-icon delete"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    <section className="admin-section">
  <h2>Work Experiences</h2>
  <form onSubmit={handleExperienceSubmit} className="admin-form">
    <div className="form-group">
      <label>Company</label>
      <input
        type="text"
        name="company"
        value={experienceForm.company}
        onChange={handleExperienceChange}
        required
      />
    </div>
    <div className="form-group">
      <label>Position</label>
      <input
        type="text"
        name="position"
        value={experienceForm.position}
        onChange={handleExperienceChange}
        required
      />
    </div>
    <div className="form-group">
      <label>Description (use new lines for paragraphs)</label>
      <textarea
        name="description"
        value={experienceForm.description}
        onChange={handleExperienceChange}
        rows="4"
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          name="start_date"
          value={experienceForm.start_date}
          onChange={handleExperienceChange}
          required
        />
      </div>
      <div className="form-group">
        <label>End Date (leave empty if current)</label>
        <input
          type="date"
          name="end_date"
          value={experienceForm.end_date}
          onChange={handleExperienceChange}
          disabled={experienceForm.is_current}
        />
      </div>
      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="is_current"
            checked={experienceForm.is_current}
            onChange={handleExperienceChange}
          />
          Current Position
        </label>
      </div>
    </div>
    <button type="submit" className="btn">
      {editExperienceId ? 'Update Experience' : 'Add Experience'}
    </button>
    {editExperienceId && (
      <button 
        type="button" 
        className="btn cancel"
        onClick={() => {
          setEditExperienceId(null);
          setExperienceForm({
            company: '',
            position: '',
            description: '',
            start_date: '',
            end_date: '',
            is_current: false
          });
        }}
      >
        Cancel
      </button>
    )}
  </form>
  
  <div className="experiences-list">
    {experiences.map(exp => (
      <div key={exp.id} className="experience-item">
        <div className="experience-info">
          <h3>{exp.company}</h3>
          <p>{exp.position}</p>
          <small>
            {new Date(exp.start_date).toLocaleDateString()} - 
            {exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString()}
          </small>
        </div>
        <div className="experience-actions">
          <button 
            onClick={() => handleEditExperience(exp)}
            className="btn-icon"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            onClick={() => deleteExperience(exp.id)}
            className="btn-icon delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

    <section className="admin-section">
  <h2>Pesan Masuk</h2>
  <button onClick={fetchMessages} className="btn">
    {showMessages ? 'Hide Messages' : 'View Messages'}
  </button>
  
  {showMessages && (
    <div className="messages-list">
      {messages.length === 0 ? (
        <p>Tidak Ada Pesan</p>
      ) : (
        messages.map(message => (
          <div 
            key={message.id} 
            className={`message-item ${message.is_read ? '' : 'unread'}`}
          >
            <div className="message-header">
              <h3>{message.subject || 'No Subject'}</h3>
              <span className="message-date">
                {new Date(message.created_at).toLocaleString()}
              </span>
            </div>
            <div className="message-sender">
              Dari: {message.name} ({message.email})
            </div>
            <div className="message-content">
              {message.message}
            </div>
            <div className="message-actions">
              {!message.is_read && (
                <button 
                  onClick={() => markAsRead(message.id)}
                  className="btn-icon"
                >
                  Tandai Sudah di baca
                </button>
              )}
              <button 
                onClick={() => deleteMessage(message.id)}
                className="btn-icon delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )}
</section>
    </div>
  );
};

export default Admin;