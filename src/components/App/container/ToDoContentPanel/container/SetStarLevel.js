import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

import starLevelIcon from '../../../../../assets/icons/star-level-icon.svg';
import '../view/ToDoContentPanelView.scss';

export default class AddDate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <Form.Group className="star-level-input">
          <span className="star-level">
            <img className="star-level-icon" src={starLevelIcon} alt="star-level-icon"></img>
          </span>
          <Form.Control as="select">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group> 
      </Form>
    );
  }
}