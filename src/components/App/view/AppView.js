import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AppView.css';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
// import MenuPanel from '../Container/MenuPanel/view/MenuPanel';

export default class AppView extends Component {
  constructor() {
    super();

    this.state = {
      selectedList: undefined
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
              <ToDoPanelView selected={this.state.selectedList} addedItem={this.registerToDoItem}
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
    const toDoItem = { toDoID: id, toDoName: name};
    this.setState({
      selectedList: { listID: this.state.selectedList.listID,
                      listName: this.state.selectedList.listName,  
                      toDoItems: [...this.state.selectedList.toDoItems,toDoItem],
                      completedItems: []
                    }
    });
  }

  removeToDoItem = (toDoItem, isRemoved) => {
    if (isRemoved !== true) return;
    this.setState({
      selectedList: { listID: this.state.selectedList.listID,
                    listName: this.state.selectedList.listName,  
                    type: this.state.selectedList.type,
                    toDoItems: [...this.state.selectedList.toDoItems.filter(toDo => toDo.toDoID !== toDoItem.toDoID)]
                    }
    });
  }

  completeToDoItem = (toDoItem, isCompleted) => {
    if (isCompleted !== true) return;
    this.setState({
      selectedList: { listID: this.state.selectedList.listID,
                    listName: this.state.selectedList.listName,  
                    type: this.state.selectedList.type,
                    toDoItems: [...this.state.selectedList.toDoItems.filter(toDo => toDo.toDoID !== toDoItem.toDoID)],
                    completedItems: [...this.state.selectedList.completedItems, {toDoItem}]
                  }
    });
  }
}