import React from 'react';
import SearchPanel from './SearchPanel';
import CreatePanel from './CreatePanel';
import ButtonPanel from './ButtonPanel';
import {Container, Row, Col, InputGroup, FormControl, Button, Card} from 'react-bootstrap';
import '../styles/App.css';
import List from './List';
import ToDoItem from './ToDoItem';

export default class AppMainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allLists: [],
      toDoItemWillBeRegistered: undefined,
      selectedListObject: {},
      selectedListName: "Select List",
      allItemsInSelectedList: []
    };

    this.userInput = React.createRef();

  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={3}><SearchPanel/></Col>
            <Col sm={8} className="header-title-box">
              <div className="header-title-container">
                <Button className="add-item-btn" variant="info" onClick={this.addToDoItem}>+</Button>
                <InputGroup className="mb-3">
                  <FormControl
                      ref= {this.userInput}
                      type= "text"
                      placeholder= "Add todo..." 
                      aria-label="Todo-name"
                      aria-describedby="basic-addon2"
                      onChange={() => this.setInput()}
                  />
                  </InputGroup>
              </div>
            </Col>
            <Col sm={1} className="header-btn-box"><ButtonPanel/></Col>
          </Row>

          <Row className="main-container">
            <Col sm={3} className="left-panel">
              <div id="lists-cont">
                { this.state.allLists.map((list, index) => {
                  return <List listItem={ list } key={index} id={index}
                  removeItem={this.removeList} 
                  setList={this.setSelectedList}
                  addItem={this.addToDoItem} 
                  clearPrev={this.clearAllItemsComingFromPreviousSelectedList}>
                  </List>;
                }) }
              </div>
              <div id="create-panel-col">
                <CreatePanel registerItem={this.addList}/>
                </div>
            </Col>
            <Col sm={8} className="elements-panel">
                <h2 id="selected-list-title">{this.state.selectedListName}</h2>
                <div id="todo-item-cont">
                { this.state.allItemsInSelectedList.map((toDoItem) => {
                  return <ToDoItem toDoItem={ toDoItem } key={toDoItem.name} name={toDoItem.name}
                  removeItem= {this.removeToDoItem}
                  />
                }) }
              </div>
            </Col>
          </Row>

        </Container>  
      </div>
    );
  };

  addList = (listName, index) => {
      this.setState(() => ({
        allLists: [...this.state.allLists, {name: listName, id: index}]
      }));
  }

  removeList = (id) => {
    this.setState({
       allLists: [...this.state.allLists.filter(list => list.id !== id)]
    });
  }

  setSelectedList = (listName) => {
    this.clearAllItemsComingFromPreviousSelectedList(); // BURADA DATA GELMEDEN RENDER ATIYOR BUG1
    const lists = this.state.allLists;
    for (let i = 0; i < lists.length;i++) {
      if ( lists[i].name === listName) {
        this.setState(({
          selectedListObject: lists[i]
        }));
      }
    }
    this.setSelectedListName();
    // console.log(this.state.selectedListObject);
  }

  clearAllItemsComingFromPreviousSelectedList = () => {
    this.setState({
      allItemsInSelectedList: []
    })
  }

  setSelectedListName = () => {
    this.setState({
      selectedListName: this.state.selectedListObject.name
    })
  }

  setInput = () => {
    this.setState({
      toDoItemWillBeRegistered: this.userInput.current.value
    });
    // console.log(this.state.toDoItemWillBeRegistered);
  }

  addToDoItem = () => {
    const allItems = this.state.allItemsInSelectedList;
    
    this.setState({
      allItemsInSelectedList: [...allItems, {name: this.state.toDoItemWillBeRegistered}]
    });

    // console.log(this.state.allItemsInSelectedList);
  }

  isSelectedList = (list) => {
    return this.state.selectedListObject === list;
  }
}
  


  