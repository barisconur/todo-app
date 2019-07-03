import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AppView.css';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
// import MenuPanel from '../Container/MenuPanel/view/MenuPanel';

export default class AppView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedList: undefined
    }
  }
  
  render() {
    return (
      <div>
        <Container id="app-container">
          <Row>
            <Col sm={2} className="panel-container">
              <ListPanelView selectedList={this.setSelectedList}/>
            </Col>

            <Col sm={10} className="todo-panel-container">
              <ToDoPanelView selectedList={this.sendSelectedListToDoPanel}/>
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

  sendSelectedListToToDoPanel = () => {
      const listName = this.state.selectedList;
      console.log(listName);

      if (listName !== '') {
        return listName;
      }
      return undefined;
  }
}