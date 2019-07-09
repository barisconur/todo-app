import React from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import '../view/ListPanelView.css';

export default class SearchContainer extends React.Component {
   render() {
      return (
         <InputGroup className="search-container">
         <FormControl className="search-field"
         placeholder="Search..."
         aria-label="List-name"
         aria-describedby="basic-addon2"/>
      </InputGroup>
      );
   }
}