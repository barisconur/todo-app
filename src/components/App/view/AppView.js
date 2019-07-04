import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AppView.css';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
// import MenuPanel from '../Container/MenuPanel/view/MenuPanel';

export default class AppView extends React.Component {
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
              <ToDoPanelView selected={this.state.selectedList} addedItem={this.registerToDoItem}/>
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
    const toDoList = {name: name, id: id};
    this.setState({
      selectedList: { id: this.state.selectedList.id,
                    name: this.state.selectedList.name,  
                    type: this.state.selectedList.type,
                    toDoItems: [...this.state.selectedList.toDoItems,toDoList]
                    }
    });
  }
}