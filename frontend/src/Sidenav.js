import React from 'react';

function Sidenav() {
  return (
    <div id="mySidenav" className="sidenav">
      <div>
        <a href="index.html" className="btn btn-link text-white">Home</a>
        <a href="data.html" className="btn btn-link text-white">Data</a>
        <a href="projects.html" className="btn btn-link text-white">My Projects</a>
        <a href="about.html" className="btn btn-link text-white">About</a>
      </div>
      <div className="button-box">
        <button id="backButton" className="btn btn-secondary btn-block">Back</button>
        <button id="forwardButton" className="btn btn-secondary btn-block">Forward</button>
      </div>
    </div>
  );
}

export default Sidenav;
