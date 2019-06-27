import React from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import '../styles/ModalContainer.css';

class ModalContainer extends React.Component {
    constructor(props){
        super(props);
        this.userInput = React.createRef();

        this.state = {
            input: ""
        }
    }
    render() {
        return (
            <Modal className="modal" show={this.props.isModalShown} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create New {this.props.modal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <InputGroup className="mb-3">
                    <FormControl
                        ref= {this.userInput}
                        type= "text"
                        placeholder= "List Name" 
                        aria-label="Folder-name"
                        aria-describedby="basic-addon2"
                        onChange={() => this.setInput()}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modal-close-btn" variant="secondary" onClick={this.props.closeModal}>
                Close
                </Button>
                <Button className="modal-register-btn" variant="primary" onClick={this.register}>
                Register
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }

    register = () => {
        const inputInfo = this.state.input;
        this.props.inputFromParent(inputInfo);
    }

    setInput = () => {
        this.setState({
            input: this.userInput.current.value
        })
    }
}

export default ModalContainer;