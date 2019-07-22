import React, { Fragment } from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';

import { Menu, Item, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

import inboxIcon from '../../../../../assets/icons/inbox-icon.svg';
import starredIcon from '../../../../../assets/icons/star-icon.svg';
import todayIcon from '../../../../../assets/icons/today-icon.svg';
import weekIcon from '../../../../../assets/icons/this-week-icon.svg';
import listIcon from '../../../../../assets/icons/list-icon.svg';

import appJson from '../../../../../app';

import '../view/ListPanelView.scss';

const shortid = require('shortid');

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.userInput = React.createRef();

    this.state = {
      isRenameModalOpen: false,
      newListName: ""
    };

  }

  render() {
    return (
      <Router>
        <Fragment>
          { this.renderList() }
        </Fragment>
      </Router>
    );
  }

  renderList = () => {
    const listItem = this.props.listItem;
    const listName = listItem.listName.toLowerCase();
    const listID = listItem.listID;

    if (typeof listID === 'number') {
      return <div className="list-item-wrapper">
                <NavLink className="list-link" to={'/lists/' + listName} onClick={this.setSelectedList}>
                { this.selectIconSource(listID) }
                <h2 className="list-text">{listItem.listName}</h2>
                </NavLink>
             </div>
    } else {
      const uniqueID = shortid.generate();
      const listName = this.props.listItem.listName;

      if (listName !== undefined) {
        return <Fragment>
                <MenuProvider id= {uniqueID}>
                  <div className="list-item-wrapper">

                    <NavLink className="list-link" to={'/lists/' + listID} onClick={this.setSelectedList}>
                      <img className="list-icon" src={listIcon} alt="list-icon"></img>
                      <h2 className="list-text">{listItem.listName}</h2>
                    </NavLink>
                    { this.renderCountTexts() }

                  </div>
                </MenuProvider>
                { this.renderListMenu(uniqueID) }

                <Modal size="sm" show={this.state.isRenameModalOpen}
              // onhide yazmayı unutma
                aria-labelledby="example-modal-sizes-title-sm">
                  <Modal.Body>
                    <InputGroup className="mb-3" onKeyPress={this.handleEnterKey}>
                      <FormControl
                        ref= {this.userInput}
                        type= "text"
                        maxLength= "200"
                        placeholder= "New list name..."
                        aria-label="rename-list"
                        aria-describedby="basic-addon2"
                        onChange={() => this.setInputComingFromUser()}/>
                    </InputGroup>
                  </Modal.Body>
                    
                  <Modal.Footer>
                    <Button className="modal-register-btn" variant="primary" onClick={this.renameList}> Save </Button>
                  </Modal.Footer>
                </Modal>
             </Fragment>
      }
    }
  }

  handleEnterKey = (event) => {
    if (event.key === 'Enter') { 
      this.renameList();
    }
  }

  renameList = () => {
    const listItems = appJson.listItems;
    const currentList = this.props.listItem;
    const renamedIndex = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    let newListName = this.state.newListName;
    listItems[renamedIndex].listName = newListName;
    currentList.listName = newListName;

    this.props.sendSelectedToView(currentList);
    this.props.updateList();
  }
  
  setSelectedList = () => { 
    this.props.sendSelectedToView(this.props.listItem); 
  }

  selectIconSource = (listID) => {
    switch(listID) {
      case 0: return <img className="inbox-icon" src={inboxIcon} alt="inbox-icon"></img>
      case 1: return <img className="starred-icon" src={starredIcon} alt="starred-icon"></img>
      case 2: return <img className="today-icon" src={todayIcon} alt="today-icon"></img>
      case 3: return <img className="week-icon" src={weekIcon} alt="week-icon"></img>
      default: return null;
    }
  }

  renderCountTexts = () => {
    const listItems = appJson.listItems;
    const currentList = this.props.listItem;
    const index = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    let incompletedToDoCount = 0;
    let overDueToDoCount = 0;

    currentList.toDoItems.forEach(toDoItem => {
      if (!toDoItem.toDoStatus.isCompleted) incompletedToDoCount++;
    });

    listItems[index].numberOfIncompletedToDoCount = incompletedToDoCount;

    return <span className="list-counts-wrapper">
              { this.showCount(overDueToDoCount) } 
              { this.showCount(incompletedToDoCount) }
          </span>
  }

  renderListMenu = (uniqueID) => {
    return <Menu id= {uniqueID}>
            <Item onClick= {this.openRenameModalBox}>Rename list</Item>
            <Item onClick= {this.removeList}>Remove list</Item>
           </Menu>
  }

  openRenameModalBox = () => {
    this.setState({ isRenameModalOpen: true });
  }

  setInputComingFromUser = () => {
    this.setState({
      newListName: this.userInput.current.value 
    })
  }

  showCount = (count) => { if (count !== 0) return <h2 className="todo-count-text">{count}</h2> }

  removeList = () => {
    const answer = window.confirm("Are you sure remove this list?");
    if (!answer) return;

    const listItems = appJson.listItems;
    const currentList = this.props.listItem;
    const removedIndex = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    if (removedIndex !== undefined) listItems.splice(removedIndex,1);
    console.log(currentList.listID);
    console.log(appJson.seel.listID);
    if (currentList.listID === appJson.selectedList.listID) {
      console.log("buraya giriyomu evet");
      appJson.selectedList = listItems[0]; 
      this.props.sendSelectedToView(listItems[0]);
    }
    this.props.updateList();
  }
}