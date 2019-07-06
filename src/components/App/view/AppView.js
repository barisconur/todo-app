import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AppView.css';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import inboxIcon from '../../../assets/inbox-icon.svg';
// import MenuPanel from '../Container/MenuPanel/view/MenuPanel';
const INBOX_LIST   = {listID: 0, listName: "Inbox"  , listIcon: inboxIcon , toDoItems: [], completedItems: []};

export default class AppView extends Component {
  constructor() {
    super();

    this.state = {
      selectedList: INBOX_LIST
    };
  }

  render() {
    return (
      <div>
        <Container id="app-container">
          <Row>
            <Col sm={2} className="panel-container">
              <ListPanelView selectedList={this.setSelectedList} />
            </Col>

            <Col sm={9} className="todo-panel-container">
              <ToDoPanelView selected={this.state.selectedList} itemWillBeRegistered={this.registerToDoItem}
              itemWillBeRemoved= {this.removeToDoItem} itemWillBeCompleted={this.completeToDoItem}/>
            </Col>
            
            {/* <Col sm={3} className="panel-container">
              <MenuPanel/>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  }

  setSelectedList = (list) => {
    this.setState({
      selectedList: list
    });
  }

  registerToDoItem = (name, id) => {
    const newToDoItem = {toDoID: id, toDoName: name};

    this.setState({
      selectedList: { listID: this.state.selectedList.listID,
                      listName: this.state.selectedList.listName,  
                      toDoItems: [...this.state.selectedList.toDoItems, newToDoItem],
                      completedItems: [...this.state.selectedList.completedItems] }
                  });
  }

  removeToDoItem = (toDoItem, isRemoved) => {
    if (isRemoved !== true) return;

    this.setState({
      selectedList: { listID: this.state.selectedList.listID,
                      listName: this.state.selectedList.listName,
                      toDoItems: [...this.state.selectedList.toDoItems.filter(toDo => toDo.toDoID !== toDoItem.toDoID)],
                      completedItems: [...this.state.selectedList.completedItems] }
                  });
  }

  completeToDoItem = (toDoItem, isCompleted) => {
    if (isCompleted !== true) return;
    const newCompletedItem = {completedItemName: toDoItem.toDoName} 

    this.setState({
      selectedList: { listID: this.state.selectedList.listID,
                      listName: this.state.selectedList.listName,
                      toDoItems: [...this.state.selectedList.toDoItems.filter(toDo => toDo.toDoID !== toDoItem.toDoID)],
                      completedItems: [...this.state.selectedList.completedItems, newCompletedItem] }
                  });
  }

}