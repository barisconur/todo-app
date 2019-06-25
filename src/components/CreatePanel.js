import React from 'react';
import self_css from '../styles/CreatePanel.css';
import main_css from '../styles/App.css';
import addIcon from '../assets/add-icon.svg';
import { Button } from 'react-bootstrap';
import ListModal from './ListModal';
import FolderModal from './FolderModal';

class CreatePanel extends React.Component {
    state = {
        isCreateListOpen: false,
        isCreateFolderOpen: false
    }
    render() {
        return (
            <div className="create-panel-container">
                <div className="create-list-wrapper"> 
                    <Button variant="primary" onClick= {this.handleListShow}>
                       <img className="add-icon-image" src={addIcon}></img>
                    </Button>
                    <h3>Create list</h3>
                    <ListModal handleShow= {this.state.isCreateListOpen} closeModal= {!this.state.isCreateListOpen}/>
                </div>
                <div className="create-folder-wrapper">
                <Button variant="primary" onClick= {this.handleFolderShow}>
                       <img className="add-icon-image" src={addIcon}></img>
                    </Button>
                    <h3>Create folder</h3>
                    <FolderModal handleShow={this.state.isCreateFolderOpen} closeModal= {!this.state.isCreateFolderOpen}/>
                </div>
            </div>
            
          );
    }   

    handleListShow = () => {
        this.setState(() => ({isCreateListOpen: true}));
    };
    
    handleFolderShow = () => {
        this.setState(() => ({isCreateFolderOpen: true}));
    };

} 

export default CreatePanel; 