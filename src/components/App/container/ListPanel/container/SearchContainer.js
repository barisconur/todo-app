import React from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import '../view/ListPanelView';
import searchIcon from '../../../../../assets/search-icon.svg';

const SearchContainer = () => (
   <InputGroup className="mb-3">
      <FormControl
      placeholder="Search..."
      aria-label="List-name"
      aria-describedby="basic-addon2"
      />

      <InputGroup.Append>
         <Button variant="outline-danger">
            <img className="search-icon-image" src={searchIcon} alt="search-icon"></img>
         </Button>
      </InputGroup.Append>
   </InputGroup>
);

export default SearchContainer;