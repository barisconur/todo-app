import React from 'react';
import '../styles/CreatePanel.css';
import '../styles/App.css';
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
                    <ListModal handleShow={this.state.isCreateListOpen}
                        handleClose={this.handleListShow}/>
                </div>
                <div className="create-folder-wrapper">
                <Button variant="primary" onClick= {this.handleFolderShow}>
                       <img className="add-icon-image" src={addIcon}></img>
                    </Button>
                    <h3>Create folder</h3>
                    <FolderModal handleShow={this.state.isCreateFolderOpen} 
                        handleClose={this.handleFolderShow} />
                </div>
            </div>
            
          );
    }   

    handleListShow = () => {
        this.setState({
            isCreateListOpen: !this.state.isCreateListOpen
        });
    };
    
    handleFolderShow = () => {
        this.setState({
            isCreateListOpen: !this.state.isCreateListOpen
        });
    };

} 

export default CreatePanel; 