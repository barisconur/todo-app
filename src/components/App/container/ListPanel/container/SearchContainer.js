import React from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import '../view/ListPanelView';

const SearchContainer = () => (
   <InputGroup className="search-container">
      <FormControl className="search-field"
      placeholder="Search..."
      aria-label="List-name"
      aria-describedby="basic-addon2"
      />
   </InputGroup>
);

export default SearchContainer;