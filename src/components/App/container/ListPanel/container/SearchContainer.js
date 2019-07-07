import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import {InputGroup, FormControl} from 'react-bootstrap';
import '../view/ListPanelView';
import searchIcon from '../../../../../assets/icons/search-icon.svg';

const SearchContainer = () => (
   <InputGroup className="search-container">
      <FormControl className="search-field"
      placeholder="Search..."
      aria-label="List-name"
      aria-describedby="basic-addon2"
      />

      <InputGroup.Append>
      <Router>
         <span className="search-btn-wrapper">
            <NavLink className="search-link" to="/#search/">
            <img className="search-icon-image" src={searchIcon} alt="search-icon"></img>
            </NavLink>
         </span>
      </Router>
      </InputGroup.Append>
   </InputGroup>
);

export default SearchContainer;