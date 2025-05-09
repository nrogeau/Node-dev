import React, { useState } from 'react';

const About = () => {
  const [showEmail, setShowEmail] = useState(false);

  const emailUser = 'nicolas';
  const emailDomain = 'arch1.t.u-tokyo.ac.jp';
  const fullEmail = `${emailUser}@${emailDomain}`;

  const handleReveal = () => {
    setShowEmail(true);
  };
  return (
    
    <div className="page-wrapper">
      <h1>About</h1>
      {/* ABOUT SECTION */}
      <div className="about-container">
        <img src="pictures/self.jpeg" alt="Me" className="profile-pic" />
        <div className="about-text">
          <p className="justified">
            Dr. Nicolas Rogeau is a Swiss National Science Foundation (SNSF) Postdoc.Mobility Fellow, currently conducting research at the Architectural Informatics Laboratory at The University of Tokyo, Japan. After studying Civil Engineering and Architecture at UCLouvain, Belgium, and Laval University, Canada, he completed his PhD thesis within the NCCR DFAB at the Laboratory for Timber Constructions at EPFL, Switzerland, on the robotic assembly of timber structures.          </p>
          <p className="justified">
            Dr Rogeau's research integrates computational design and construction automation, with a particular interest in human-machine collaboration. Passionate about both traditional and innovative building techniques, he aims to bridge the two to develop more sustainable construction practices.
          </p>
          <p className="justified">
            Dr. Rogeau is also deeply involved in architectural education. He has coordinated interdisciplinary studios, courses, and workshops that combine computational thinking with a hands-on and socially engaged approach. He has also developed and coordinated a post-graduate course on Digital Timber Construction at EPFL, equipping professionals with the digital skills needed to tackle the challenges of the construction sector’s sustainable transition.          </p>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="contact-section">
      <p>
        If you have any questions, collaboration ideas, or feedback, feel free to reach out.
      </p>
      {!showEmail ? (
      <button className="button" onClick={() => setShowEmail(true)}>
      Show email
      </button>
      ) : (
        <p>
          You can reach me at:{' '}
          <a href={`mailto:${fullEmail}`} style={{ color: '#329696' }}>
            {fullEmail}
          </a>
          &nbsp; or via:{' '}
          <a className="button" href={`https://www.linkedin.com/in/nicolas-rogeau/`} style={{ color: '#329696' }}>
          Linkedin
          </a>
        </p>
      )}
      </div>
    </div>
  );
};

export default About;