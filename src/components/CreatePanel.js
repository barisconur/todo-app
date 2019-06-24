import React from 'react';
import self_css from '../styles/CreatePanel.css';
import main_css from '../styles/App.css';
import addIcon from '../assets/add-icon.svg';

const CreatePanel = (props) => (
    <div className="create-panel-container">
            <div className="create-list-wrapper">
                <button className="create-icon">
                    <img className="create-icon-image" src={addIcon}></img>
                </button>
                <text>Create list</text>
            </div>
            <div className="create-folder-wrapper">
                <button className="create-icon">
                    <img className="create-icon-image" src={addIcon}></img>
                </button>
                <text>Create folder</text>
            </div>
            
    </div>
  );

  export default CreatePanel;