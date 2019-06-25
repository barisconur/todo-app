import React from 'react';
import SearchPanel from './SearchPanel';
import CreatePanel from './CreatePanel';
import ButtonPanel from './ButtonPanel';
import {Container, Row, Col} from 'react-bootstrap';
import ListModal from './ListModal';
import css from '../styles/App.css';

export default class AppMainPage extends React.Component {
  state = {
    todoLists: [],
    selectedListItem: undefined, /*şimdilik isim verdim normalde list.state.name gelcek */
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={3}><SearchPanel/></Col>
            <Col sm={8} className="header-title-box"><h3 className="header-title">Inbox</h3></Col>
            <Col sm={1} className="header-btn-box"><ButtonPanel/></Col>
          </Row>

          <Row className="main-container">
            <Col sm={3} className="left-panel">
              <div id="lists-cont">
              </div>
              <div id="create-panel-col">
                <CreatePanel />
                </div>
            </Col>
            <Col sm={9}></Col>
          </Row>
        </Container>  
      </div>
    );
  };



  getSelectedListItemName = () => {
    //TO-DO 
  };
  
  createListItem = (listItem) => {

  };

  removeListItem = () => {
    //TO-DO
  };

  renameListItem = () => {
    //TO-DO
  };

  copyListItem = () => {
    //TO-DO
  };

  duplicateListItem = () => {
    //TO-DO
  };

  moveListItemInFolder = () => {
    //TO-DO
  };

  printListItem = () => {
    //TO-DO
  };

}


  