import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal show={this.props.isModalShown} onHide={this.props.closeButton}>
            <Modal.Header closeButton>
                <Modal.Title>Create a new {this.props.modalName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button className="modal-close-btn" variant="secondary" onClick={this.props.closeButton}>
                Close
                </Button>
                <Button className="modal-register-btn" variant="primary" onClick={this.props.register}>
                Register
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default ModalContainer;