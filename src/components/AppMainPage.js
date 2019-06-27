import React from 'react';
import SearchPanel from './SearchPanel';
import CreatePanel from './CreatePanel';
import ButtonPanel from './ButtonPanel';
import {Container, Row, Col} from 'react-bootstrap';
import '../styles/App.css';
import List from './List';

export default class AppMainPage extends React.Component {
  state = {
    allLists: [],
    selectedList: undefined,
    listCount: 0

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
            <Col sm={2} className="left-panel">
              <div id="lists-cont">
                { this.state.allLists.map((list, index) => {
                  return <List listItem={ list } key={index} id={index}
                  removeItem ={this.removeListItem}></List>;
                }) }
              </div>
              <div id="create-panel-col">
                <CreatePanel registerItem={this.addListItem}/>
                </div>
            </Col>
            <Col sm={9} className="elements-panel">
              <div id="elements-cont">

              </div>
            </Col>
          </Row>

        </Container>  
      </div>
    );
  };

  addListItem = (listName, index) => {
      this.setState((prevState) => ({
        allLists: [...this.state.allLists, {name: listName, id: index}]
      }));
  }

  removeListItem = (id) => {
    this.setState({
       allLists: [...this.state.allLists.filter(list => list.id !== id)]
    });
  }
}
  


  