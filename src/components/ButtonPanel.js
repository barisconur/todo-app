import React from 'react';
import self_css from '../styles/ButtonPanel.css'
import main_css from '../styles/App.css';
import sortIcon from '../assets/sort-icon.svg';
import moreIcon from '../assets/more-icon.svg';
import {Button, ButtonToolbar} from 'react-bootstrap';

const ButtonPanel = (props) => (
  <ButtonToolbar>
      <Button variant="outline-secondary">
      <img className="sort-icon-image" src={sortIcon}></img>
    </Button>
    <Button variant="outline-secondary">
      <img className="more-icon-image" src={moreIcon}></img>
    </Button>
  </ButtonToolbar>
  );

  export default ButtonPanel;