import React from 'react';
import Modal from 'react-modal';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import self_css from '../styles/ListModal.css';

class ListModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            listName: ""
        };
    };
    
    render() {
        return (
            <Modal isOpen={this.props.handleShow} onRequestClose={this.props.handleClose}>
                <h3 className="modal-title">Create a new list</h3>
                <br></br><br></br>
                <InputGroup className="mb-3">
                <FormControl
                placeholder="List Name"
                aria-label="List-name"
                aria-describedby="basic-addon2"
                />
                </InputGroup>
                <br></br>
                <div className= "btns">
                <Button className="close-btn" variant="secondary" onClick={this.props.handleClose}>
                   Close
               </Button>
               <Button className="register-btn" variant="primary" onClick={this.props.handleClose}>
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

export default ListModal;
