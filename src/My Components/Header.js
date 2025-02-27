import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Header({ title, searchBar, todos, setFilteredTodos }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchText.trim()) {
      setFilteredTodos(todos);  // Reset to full list when search is empty
      return;
    }

    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredTodos(filtered.length > 0 ? filtered : [{ sno: -1, title: "Todo not found", desc: "" }]);
  };

  // Handle search text change dynamically
  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    if (!text.trim()) {
      setFilteredTodos(todos); // Reset when input is cleared
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">{title}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
            </ul>
            {searchBar ? (
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchText}
                  onChange={handleChange}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            ) : ""}
          </div>
        </div>
      </nav>
    </>
  );
}

Header.defaultProps = {
  title: "Your title here",
  searchBar: true,
};

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool.isRequired,
  todos: PropTypes.array.isRequired,
  setFilteredTodos: PropTypes.func.isRequired,
};
