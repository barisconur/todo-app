import React from 'react';
import css from '../styles/Search.css'
import main_css from '../styles/App.css';
import searchIcon from '../assets/search-icon.svg'

const Search = (props) => (
    <div className="search-container">
        <input className="search-input" type="text"></input>
            <button className="search-icon">
                <img className="search-icon-image" src={searchIcon}></img>
            </button>
    </div>
  );

  export default Search;