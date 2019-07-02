import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import '../view/MenuPanel';
import sortIcon from '../../../../../assets/sort-icon.svg';
import moreIcon from '../../../../../assets/more-icon.svg';


const OptionsContainer = () => (
  <ButtonToolbar>
      <Button variant="outline-primary">
        <img className="sort-icon-image" src={sortIcon} alt="sort-icon"></img>
      </Button>

      <Button variant="outline-primary">
        <img className="more-icon-image" src={moreIcon} alt="more-icon"></img>
      </Button>
  </ButtonToolbar>
  );

  export default OptionsContainer;