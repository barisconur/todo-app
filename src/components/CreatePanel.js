import React from 'react';
import '../styles/CreatePanel.css';
import '../styles/App.css';
import addIcon from '../assets/add-icon.svg';
import { Button } from 'react-bootstrap';
import ModalContainer from './ModalContainer';

class CreatePanel extends React.Component {
    state = {
        showModal: false,
        modalName: "",
        itemNameWillBeRegistered: ""
    }
    render() {
        return (
            <div className="create-panel-container">
                <div className="create-list-wrapper"> 
                    <Button className="create-list-btn" variant="primary" onClick= {this.handleListModal}>
                       <img className="add-icon-image" src={addIcon} alt="add-list-img"></img>
                    </Button>
                    <h3>Create list</h3>
                    <ModalContainer isModalShown={this.state.showModal} 
                                    closeModal={this.handleClose}
                                    register={this.registerList}
                                    modal={this.state.modalName}/>
                </div>

                <div className="create-folder-wrapper">
                    <Button className="create-folder-btn" variant="primary" onClick= {this.handleFolderModal}>
                       <img className="add-icon-image" src={addIcon} alt ="add-folder-img"></img>
                    </Button>
                    <h3>Create folder</h3>     

                </div>
            </div>
            
          );
    } 

    handleListModal = () => {
        this.setState({
            showModal: true,
            modalName: 'List'
        });
    };  

    handleFolderModal = () => {
        this.setState({
            showModal: true,
            modalName: 'Folder'
        });
    };

    handleClose = () => {
        this.setState({
            showModal: false
        });
    };

    registerList = () => {
        this.handleClose();
        this.setState({
            itemNameWillBeRegistered: ""
        })
    }

    registerFolder = () => {
        this.handleClose();
        this.setState( {
            itemNameWillBeRegistered: ""
        })
    }

} 

export default CreatePanel; 