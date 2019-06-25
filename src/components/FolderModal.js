import React from 'react';
import Modal from 'react-modal';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import self_css from '../styles/FolderModal.css';

class FolderModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: "",
            show: false
        };
    };

    handleClose = () => {
        this.setState({isOpen: false });
    }   
    
    render() {
        return (
            <Modal isOpen={this.props.handleShow} onRequestClose= {this.props.handleClose}>
                <h3 className="modal-title">Create a new folder</h3>
                <br></br><br></br>
                <InputGroup className="mb-3">
                <FormControl
                placeholder="Folder Name"
                aria-label="Folder-name"
                aria-describedby="basic-addon2"
                />
                </InputGroup>
                <br></br>
                <div className= "btns">
                <Button className="close-btn" variant="secondary" onClick={this.props.handleClose}>
                   Close
               </Button>
               <Button variant="primary" >
                   Register
               </Button>
                </div>
            </Modal>
        );
    }

    componentDidMount() {
        Modal.setAppElement('body');
     }
}

export default FolderModal;