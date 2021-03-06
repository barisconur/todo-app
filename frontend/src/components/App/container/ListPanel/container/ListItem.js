import React, { Fragment } from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
import { MenuProvider, Menu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

import ListModificationModal from './ListModificationModal';

import inboxIcon from '../../../../../assets/icons/inbox-icon.svg';
import starredIcon from '../../../../../assets/icons/star-icon.svg';
import todayIcon from '../../../../../assets/icons/today-icon.svg';
import weekIcon from '../../../../../assets/icons/this-week-icon.svg';
import listIcon from '../../../../../assets/icons/list-icon.svg';

import { findCurrentListInJSON, findCurrentListIndex } from '../../../utils';

import appJson from '../../../../../app';

import '../view/ListPanelView.scss';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRenameModalOpen: false
    };
  }

  sendSelectedListToAppView = (selectedList) => { this.props.sendSelectedToView(selectedList); }

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
    const listName = listItem.listName;
    const listID = listItem.listID;    

    if (listID <= 3) {
      return <div className="list-item-wrapper">

                <NavLink className="list-link" to={'/lists/' + listName} onClick= {this.setSelectedList}>
                { this.selectIconSource(listID) }
                <h2 className="list-text">{listName}</h2>
                </NavLink>

             </div>
    } else {
      return <Fragment>
              <MenuProvider id= {listID}>
                <div className="list-item-wrapper">

                  <NavLink className="list-link" to={'/lists/' + listID} onClick={this.setSelectedList}>
                    <img className="list-icon" src={listIcon} alt="list-icon"></img>
                    <h2 className="list-text">{listName}</h2>
                  </NavLink>
                  { this.renderCountTexts() }
                </div>
              </MenuProvider>

              { this.renderListMenu(listID) }

              <ListModificationModal listItem={ listItem } isRenameModalOpen={this.state.isRenameModalOpen} 
              sendModalUpdate={this.sendSelectedListToAppView} updateList={this.props.updateList} closeModal={this.closeModalBox}/>
            </Fragment>
    }
  }
  
  setSelectedList = () => { this.props.sendSelectedToView(this.props.listItem) }

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
    const currentList = findCurrentListInJSON(this.props.listItem);

    let incompletedToDoCount = 0;
    let overDueToDoCount = 0;

    currentList.toDoItems.forEach(toDoItem => {
      if (!toDoItem.toDoStatus.isCompleted) incompletedToDoCount++;
    });
    currentList.numberOfIncompletedToDoCount = incompletedToDoCount;
    
    return <span className="list-counts-wrapper">
              { this.showCount(overDueToDoCount) } 
              { this.showCount(incompletedToDoCount) }
          </span>
  }

  showCount = (count) => { if (count !== 0) return <h2 className="todo-count-text">{count}</h2> }

  renderListMenu = (uniqueID) => {
    return <Menu id= {uniqueID}>
            <Item onClick= {this.openModalBox}>Rename list</Item>
            <Item onClick= {this.removeList}>Remove list</Item>
           </Menu>
  }
 
  openModalBox = () => {this.setState({ isRenameModalOpen: true })}

  closeModalBox = () => {this.setState({ isRenameModalOpen: false })} 

  removeList = () => {
    const answer = window.confirm("Are you sure remove this list?");
    if (!answer) return;
    
    const listItems = appJson.listItems;
    const currentList = this.props.listItem;
    const index = findCurrentListIndex(currentList);

    console.log(index);
    if (index !== undefined) listItems.splice(index,1);

    if (currentList.listID === appJson.selectedList.listID) {
      appJson.selectedList = listItems[0]; 
      this.props.sendSelectedToView(listItems[0]);
    }
    this.props.updateList();
  }
}