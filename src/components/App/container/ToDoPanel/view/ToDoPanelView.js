import React, { Fragment } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import inboxIcon from '../../../../../assets/background-images/inbox-big-icon.svg';
import starIcon from '../../../../../assets/background-images/star-big-icon.svg';
import todayIcon from '../../../../../assets/background-images/today-big-icon.svg';
import weekIcon from '../../../../../assets/background-images/this-week-big-icon.svg';

import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';
import SearchPanel from '../container/SearchPanel';
import DueTimePanel from '../container/DueTimePanel';
import StarredPanel from '../container/StarredPanel';

import ToDoContentPanelView  from '../ToDoContentPanel/view/ToDoContentPanelView';

import '../view/ToDoPanelView.scss';

const shortid = require('shortid');

const CONTENT_PANEL_SIZE = 3, TODO_PANEL_SIZE = 12;

export default class ToDoPanelView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCompletedShown: false,
      isContentPanelOpen: false,
      removedToDo: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedList !== prevProps.selectedList) { 
      this.setState({ 
        isCompletedShown: false,
        isContentPanelOpen: false
      });
    }
    if (this.props.selectedToDo !== prevProps.selectedToDo) {
      if (this.state.removedToDo !== prevProps.selectedToDo) {
        this.props.updateSelectedToDo(this.props.selectedToDo);
        return;
      }
      this.handleContentPanel();
    }
    if (this.props.searchedWord !== prevProps.searchedWord) this.closeContentPanel();
  }

  sendSelectedListToAppView = (selectedList) => { this.props.updateSelectedList(selectedList) }

  sendToDoItemToAppView = (toDoItem) => { 

    this.handleContentPanel(toDoItem);
    this.props.updateSelectedToDo(toDoItem);
  }

  handleContentPanel = (toDoItem) => {
    console.log(toDoItem);
    console.log(this.props.selectedToDo);
    console.log(this.state.removedToDo);
    if (toDoItem === undefined && this.props.selectedToDo === this.state.removedToDo) {
      console.log("if1");
      this.closeContentPanel(); // if selected is removed
    }
    if (this.props.selectedToDo === undefined){
      console.log("if2");
      this.openContentPanel();
    }
    if (this.props.selectedToDo === toDoItem) {
      console.log("if3")
      this.toggleContentPanel(); // second time select same item automatically close todoContentPanel
    }
  }

  setRemovedItem = (toDo) => { this.setState({removedToDo: toDo}) } 

  render() {
    return (
      <Container id="todo-panel-container">
        <Row id="todo-panel-row">
          <Col sm={this.getToDoPanelSize()}> { this.displayToDoPanel() } </Col>
          { this.renderContentPanel() }
        </Row>
      </Container>
    );
  }

  getToDoPanelSize = () => {
    if (this.state.isContentPanelOpen) {
      return TODO_PANEL_SIZE - CONTENT_PANEL_SIZE;
    } else {
      return TODO_PANEL_SIZE ;
    }
  }

  displayToDoPanel = () => {
    if (this.props.searchedWord.length !== 0) {
      return <SearchPanel searchedWord={this.props.searchedWord} updateSelectedList={this.sendSelectedListToAppView} 
      updateToDo={this.sendToDoItemToAppView}/>
    } else if (typeof this.props.selectedList.listID === 'string' || this.props.selectedList.listID === 0) {
      return this.renderToDoPanel();
    } else {
      switch(this.props.selectedList.listID) {
        case 2: return <DueTimePanel/> 
        case 3: return <DueTimePanel/> 
        default: return <StarredPanel/> 
     }
    }
  }
  renderToDoPanel = () => {
    return ( 
      <Fragment>
        <Navbar newSelectedListName= {this.props.selectedList.listName}/>
         { this.renderAddToDoComponent() }
         { this.renderOpeningScene() }

         <div className="completed-items-container">
          { this.showCompletedButton() }
          { this.renderCompletedItems() }
        </div>
      </Fragment>
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
            <div className="empty-todo-container">
              { this.renderImageSrc() }
              { this.renderTextSrc() }
            </div>
          </div>
    
  }

  renderImageSrc = () => {
    switch(this.props.selectedList.listName) {
      case 'Inbox'    : return <img className="empty-list-img" src={inboxIcon} alt="inbox-img"></img>
      case 'Starred'  : return <img className="empty-list-img" src={starIcon} alt="starred-img"></img>
      case 'Today'    : return <img className="empty-list-img" src={todayIcon} alt="today-img"></img>
      case 'This Week': return <img className="empty-list-img" src={weekIcon} alt="week-img"></img>
      default         : return <img className="empty-list-img" src={inboxIcon} alt="list-img"></img> // bu değişecek
    }
  }

  renderTextSrc = () => {
    const selectedListName = this.props.selectedList.listName;
    switch(selectedListName) {
      case 'Inbox'    : return <h2 className="empty-list-text">{selectedListName + ' is empty. Please add some to-dos'}</h2>
      case 'Starred'  : return <h2 className="empty-list-text">You have no Starred to-do</h2>
      case 'Today'    : return <h2 className="empty-list-text">You have no to-do due today</h2>
      case 'This Week': return <h2 className="empty-list-text">You have no to-do due this week</h2>
      default         : return <h2 className="empty-list-text">{selectedListName + ' is empty. Please add some to-dos'}</h2> // bu değişecek
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
    return incompletedToDos.map((toDoItem) => {
      return <ToDoItem selectedList= {selectedList} toDoItem= {toDoItem} key={shortid.generate()}
      updateList= {this.sendSelectedListToAppView} updateToDo= {this.sendToDoItemToAppView} removedItem={this.setRemovedItem}/>
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
        updateList={this.sendSelectedListToAppView} updateToDo={this.sendToDoItemToAppView}/>
      })
    }
  }

  renderContentPanel = () => {
    if (this.state.isContentPanelOpen) {
      return <Col sm={CONTENT_PANEL_SIZE} className="todo-content-panel-container">
              <ToDoContentPanelView selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              setSelectedList={this.sendSelectedListToAppView} setSelectedToDo={this.sendToDoItemToAppView}/>
             </Col>
    }
  }

  openContentPanel = () => {this.setState({ isContentPanelOpen: true })}

  closeContentPanel = () => {this.setState({ isContentPanelOpen: false })}

  toggleContentPanel = () => {this.setState({ isContentPanelOpen: !this.state.isContentPanelOpen })}  
}