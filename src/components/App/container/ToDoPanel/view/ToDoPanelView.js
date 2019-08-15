import React, { Fragment } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import inboxIcon from '../../../../../assets/background-images/inbox-big-icon.svg';
import listIcon from '../../../../../assets/background-images/list-big-icon.svg';

import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';

import SearchPanel from '../container/SearchPanel';
import DueTimePanel from '../container/DueTimePanel';
import StarredPanel from '../container/StarredPanel';

import ToDoContentPanelView  from '../ToDoContentPanel/view/ToDoContentPanelView';

import '../view/ToDoPanelView.scss';

const shortid = require('shortid');

const CONTENT_PANEL_SIZE = 3, TODO_PANEL_SIZE = 9;

export default class ToDoPanelView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedToDo: undefined,
      isCompletedShown: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedList !== prevProps.selectedList) { 
      this.setState({ isCompletedShown: false });
      this.renderContentPanel();
    }
  }

  sendSelectedListToAppView = (selectedList) => { this.props.updateSelectedList(selectedList) }

  setSelectedToDo = (toDo) => { this.setState({ selectedToDo: toDo }) }

  render() {
    return (
      <Container id="todo-panel-container">
        <Row id="todo-panel-row">
          <Col sm={TODO_PANEL_SIZE}> { this.displayToDoPanel() } </Col>
          { this.renderContentPanel() }
        </Row>
      </Container>
    );
  }

  displayToDoPanel = () => {
    if (this.props.searchedWord.length !== 0) {
      return <SearchPanel searchedWord={this.props.searchedWord} updateSelectedList={this.sendSelectedListToAppView} 
      updateToDo={this.setSelectedToDo}/>
    } else if (this.props.selectedList.listID >= 4 || this.props.selectedList.listID === 0) {
      return this.renderToDoPanel();
    } else {
      console.log("buraya giriyo mu");
      switch(this.props.selectedList.listID) {
        case 2: return <DueTimePanel selectedList={this.props.selectedList}  selectedToDo={this.props.selectedToDo}
        updateSelectedList={this.sendSelectedListToAppView} updateToDo={this.setSelectedToDo}/> 

        case 3: return <DueTimePanel selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
        updateSelectedList={this.sendSelectedListToAppView} updateToDo={this.setSelectedToDo}/> 

        default: return <StarredPanel selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
        updateSelectedList={this.sendSelectedListToAppView} updateToDo={this.setSelectedToDo}/> 
     }
    }
  }
  renderToDoPanel = () => {
    return ( 
      <div className="all-items-container">
        <Navbar newSelectedListName= {this.props.selectedList.listName}/>
         { this.renderAddToDoComponent() }
         { this.renderOpeningScene() }

         <div className="completed-items-container">
          { this.showCompletedButton() }
          { this.renderCompletedItems() }
        </div>
      </div>
    )
  }

  renderAddToDoComponent = () => {
    return <AddToDo selectedList={this.props.selectedList} updateList={this.sendSelectedListToAppView}/> 
  }

  renderOpeningScene = () => {
    if (this.props.selectedList.toDoItems.length === 0) {
      return this.renderEmptyListPanel();
    } else {
      return  <div className="todo-items-container">
                { this.renderToDoItems() }
              </div>        
    }
  }

  renderEmptyListPanel = () => {
    return <div className="empty-todo-panel-container">
            <div className="empty-todo-container"> { this.renderEmptyListSrc() } </div>
          </div>
    
  }

  renderEmptyListSrc = () => {
    const selectedListName = this.props.selectedList.listName;
    switch(selectedListName) {
      case 'Inbox'    : return <Fragment>
                                <img className="empty-list-img" src={inboxIcon} alt="inbox-img"></img>
                                <h2 className="empty-list-text">{selectedListName + ' is empty. Please add some to-dos'}</h2>    
                              </Fragment>
      default         : return <Fragment>
                                <img className="empty-list-img" src={listIcon} alt="list-img"></img>
                                <h2 className="empty-list-text">{selectedListName + ' is empty. Please add some to-dos'}</h2> 
                              </Fragment>
    }
  }
  renderToDoItems = () => {
    const selectedList = this.props.selectedList;
    let incompletedToDos = [];

    if (selectedList !== undefined) {
      const allToDos = selectedList.toDoItems;

      if (allToDos.length !== 0) {
        allToDos.forEach((toDo) => {if (!toDo.toDoStatus.isCompleted) incompletedToDos.push(toDo);  
        })
      }
    }
    return incompletedToDos.map((toDoItem)  => {
      return <ToDoItem selectedList= {selectedList} toDoItem= {toDoItem} key={shortid.generate()}
      updateList= {this.sendSelectedListToAppView} updateToDo= {this.setSelectedToDo}/>
    })
  } 

  showCompletedButton = () => {
    const selectedList = this.props.selectedList;
    let completedToDos = [];
    
    if (selectedList.toDoItems !== undefined) {
      const allToDos = selectedList.toDoItems;
      if (allToDos.length !== 0) allToDos.forEach((toDo) => { if (toDo.toDoStatus.isCompleted) completedToDos.push(toDo) })
      
      if (completedToDos.length === 0) return;
        return <Button className="show-completed-btn" variant="dark" size="sm" onClick={this.toggleShowButton}>
                SHOW COMPLETED TO-DOS
              </Button>
    }
  }

  toggleShowButton = () => {this.setState({ isCompletedShown: !this.state.isCompletedShown })}
  
  renderCompletedItems = () => {
    if(!this.state.isCompletedShown) return;  

    const selectedList = this.props.selectedList;
    let completedToDos = [];

    if (selectedList !== undefined) {
      const allToDos = selectedList.toDoItems;
      if (allToDos.length !== 0) allToDos.forEach((toDo) => { if (toDo.toDoStatus.isCompleted) completedToDos.push(toDo) })

      return completedToDos.map((toDoItem) => {
        return <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
        updateList={this.sendSelectedListToAppView} updateToDo={this.setSelectedToDo}/>
      })
    }
  }

  renderContentPanel = () => {
      return <Col sm={CONTENT_PANEL_SIZE} className="todo-content-panel-container">
              <ToDoContentPanelView selectedList={this.props.selectedList} selectedToDo={this.state.selectedToDo}
              setSelectedList={this.sendSelectedListToAppView} setSelectedToDo={this.setSelectedToDo}/>
             </Col>
    }
}