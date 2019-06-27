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
                { this.state.allLists.map((list) => {
                  return <List listItem={ list } key={this.state.listCount} removeItem ={this.removeListItem}></List>;
                }) }
              </div>
              <div id="create-panel-col">
                <CreatePanel registerItem={this.addList}/>
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

  addList = (listName) => {
    console.log(this.state.listCount);
    this.setState((prevState) => ({
      allLists: [...this.state.allLists, {name: listName, id: this.state.listCount}],
      listCount: prevState.listCount++
    }));
  }

  removeListItem = (id) => {
    console.log(id);
    const newList = this.state.allLists.filter (list => list.id !== id);
    this.setState({
      allLists: newList
    })
  }

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


  