import React from 'react';
import '../styles/ButtonPanel.css'
import '../styles/App.css';
import sortIcon from '../assets/sort-icon.svg';
import moreIcon from '../assets/more-icon.svg';
import {Button, ButtonToolbar} from 'react-bootstrap';

const ButtonPanel = () => (
  <ButtonToolbar>
      <Button variant="outline-secondary">
      <img className="sort-icon-image" src={sortIcon} alt="sort-icon"></img>
    </Button>
    <Button variant="outline-secondary">
      <img className="more-icon-image" src={moreIcon} alt="more-icon"></img>
    </Button>
  </ButtonToolbar>
  );

  export default ButtonPanel;