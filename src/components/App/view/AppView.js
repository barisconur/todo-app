import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AppView.css';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import { INBOX_LIST, INBOX_LIST_NAME, STARRED_LIST_NAME, TODAY_LIST_NAME, THIS_WEEK_NAME } from '../../constants';


export default class AppView extends Component {
  constructor() {
    super();

    this.state = {
      selectedList: INBOX_LIST,
      listNames: [INBOX_LIST_NAME, STARRED_LIST_NAME, TODAY_LIST_NAME, THIS_WEEK_NAME],
      folderNames: []
    };
  }

  render() {
    console.log("AppViewdaki selected List", this.state.selectedList);
    return (
      <div>
        <Container id="app-container">
          <Row>
            <Col sm={2} className="list-panel-container">
              <ListPanelView selectedList={this.setSelectedList} sendListNameToAppView={this.setListNames}
              sendFolderNameToAppView={this.setFolderNames} listNames={this.state.listNames} folderNames={this.state.folderNames}
              updatedList={this.state.selectedList}
              />
            </Col>

            <Col sm={10} className="todo-panel-container">
              <ToDoPanelView selectedList={this.state.selectedList} itemToRegister={this.registerToDoItem}
              itemToRemove= {this.removeToDoItem} itemToComplete={this.completeToDoItem}/>
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

  setListNames = (listName) => {
    this.setState({
      listNames: [...this.state.listNames, listName]
    });
  }

  setFolderNames = (folderName) => {
    this.setState({
      listNames: [...this.state.folderNames, folderName]
    });
  }

  registerToDoItem = (newToDo) => {
    this.setState({
      selectedList: { listID: this.state.selectedList.listID,
                      listName: this.state.selectedList.listName,  
                      toDoItems: [...this.state.selectedList.toDoItems, newToDo],
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
    const newCompletedItem = {toDoName: toDoItem.toDoName} 

    this.setState({
      selectedList: { listID: this.state.selectedList.listID,
                      listName: this.state.selectedList.listName,
                      toDoItems: [...this.state.selectedList.toDoItems.filter(toDo => toDo.toDoID !== toDoItem.toDoID)],
                      completedItems: [...this.state.selectedList.completedItems, newCompletedItem] }
                   });
  }

}