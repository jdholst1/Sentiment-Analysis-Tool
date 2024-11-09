import React from 'react';

function Header() {
  return (
    <header className="bg-light">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <a href="index.html">
          <img className="logo" src="images/databookslogo.png" alt="Data Books logo" height="50" />
        </a>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
