import React from 'react';

import Topbar from 'Components/Topbar';

import './index.scss';
import { useNavigate } from 'react-router-dom';

const ProjectPage = () => {
  const navigate = useNavigate();
  return (
    <div className="projectPage">
      <Topbar />
      <div className="projectPage__header">
        <h1>About this project</h1>
        <p>
          This project is part of Neocoast's Introduction to React
          Bootcamp, serving as the final project. Throughout this
          experience, I had the opportunity to deepen my knowledge of
          the technology, as well as learn about best practices when
          working with SCSS and Git. The project is an e-commerce
          platform that utilizes a pre-built API, providing limited
          options. It posed a challenge to devise ways to modify
          shopping carts within the given constraints.
        </p>
      </div>
      <div className="projectPage__duration">
        <h1>Duration</h1>
        <p>
          The project was carried out in the final period of the
          bootcamp, providing us, the students, with approximately two
          weeks to complete the project and submit it for later
          evaluation by the company. During that time, we had the
          support of our teachers, who provided guidance on areas for
          improvement.
        </p>
      </div>

      <div className="projectPage__aboutMe">
        <h1>About Me</h1>
        <p>
          My name is Facundo Riñon, and I am a graduate of Hack
          Academy's Coding Bootcamp, where I invested more than 600
          hours in a work regimen, learning technologies such as
          React.js, Node.js, Express.js, MongoDB, SQL, JavaScript, and
          CSS. I have recently completed a React.js development
          bootcamp at the company NeoCoast, where I deepened my
          knowledge and received instruction in adhering to industry
          best practices. In 2022, I graduated from the Jóvenes a
          Programar course, marking the starting point in my journey
          as a developer. Additionally, I am an advanced student in
          Psychology. Currently, I am actively seeking my first
          professional experience in the IT field, which motivates me
          to remain in continuous learning mode to be considered in
          selection processes. If you would like to learn more about
          me, I invite you to check out my web portfolio, where you
          can see my other projects, or visit my social media profiles
          listed on the card.
        </p>
      </div>
      <div className="projectPage__me">
        <img
          className="projectPage__img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlFDTf5McUXXC56x5qllmXZmyisTkO5_dV7MHPfM8gAhwM2Dwsl9K6BZF6TfXDIR96vic&usqp=CAU"
          alt=""
        />
        <div className="projectPage__info">
          <h1>Facundo Riñón</h1>
          <p>Montevideo, Uruguay</p>
          <small>Full Stack Developer</small>
        </div>
        <div className="projectPage__contact">
          <p
            onClick={() =>
              window.open(
                'https://www.linkedin.com/in/facundo-ri%C3%B1%C3%B3n-93b730220/',
                '_blank',
              )
            }
            className="projectPage__link--linkedin">
            LinkedIn
          </p>
          <p
            onClick={() =>
              window.open('https://github.com/FacundoRinon', '_blank')
            }
            className="projectPage__link--github">
            Git-hub
          </p>

          <p
            onClick={() =>
              window.open(
                'https://web-portfolio-facundorinon.vercel.app/',
                '_blank',
              )
            }
            className="projectPage__link--portfolio">
            Web-portfolio
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
