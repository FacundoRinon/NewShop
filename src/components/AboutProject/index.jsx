import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const AboutProject = () => {
  const navigate = useNavigate();
  return (
    <div className="aboutProject">
      <p onClick={() => navigate('/project')}>About this project</p>
    </div>
  );
};

export default AboutProject;
