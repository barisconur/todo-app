import React from 'react';
import '../view/ListPanelView';
import addIcon from '../assets/add-icon.svg';
import ModalContainer from './ModalContainer';

const ButtonContainer = () => (
  <div className="btn-container">
    <button className="add-btn">+</button>
    <h3 className="add-text">Create list</h3>
  </div>
);

export default ButtonContainer;