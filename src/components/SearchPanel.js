import React from 'react';
import self_css from '../styles/SearchPanel.css'
import main_css from '../styles/App.css';
import searchIcon from '../assets/search-icon.svg';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

const SearchPanel = (props) => (
    <InputGroup className="mb-3">
    <FormControl
      placeholder="Search..."
      aria-label="List-name"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="outline-secondary">
          <img className="search-icon-image" src={searchIcon}></img>
          </Button>
    </InputGroup.Append>
  </InputGroup>
  );

  export default SearchPanel;