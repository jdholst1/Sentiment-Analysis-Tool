import React from 'react';

function Header({ toggleDarkMode }) {
  return (
    <header className="App-header bg-light">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <a href="index.html">
          <img className="logo" src="/images/databookslogo.png" height="50" />
        </a>
        <button className="dark-mode-button" type="button" onClick= {toggleDarkMode}>
          <img src="/images/darkModeIcon.png" alt="Dark Mode" height="40" />
        </button>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
