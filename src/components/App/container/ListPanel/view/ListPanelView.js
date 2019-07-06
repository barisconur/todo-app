import React from 'react';
import '../view/ListPanelView';
import SearchContainer from '../container/SearchContainer';
import ButtonContainer from '../container/ButtonContainer';
import ModalContainer from '../container/ModalContainer';
import ListItem from '../container/ListItem';
import FolderItem from '../container/FolderItem';

import inboxIcon from '../../../../../assets/inbox-icon.svg';
import starIcon from '../../../../../assets/star-icon.svg';
import todayIcon from '../../../../../assets/today-icon.svg';
import weekIcon from '../../../../../assets/this-week-icon.svg';
import listIcon from '../../../../../assets/list-icon.svg';

const INBOX_LIST   = {listID: 0, listName: "Inbox"    , listIcon: inboxIcon , toDoItems: [], completedItems: []};
const STARRED_LIST = {listID: 1, listName: "Starred"  , listIcon: starIcon  , toDoItems: [], completedItems: []};
const TODAY_LIST   = {listID: 2, listName: "Today"    , listIcon: todayIcon , toDoItems: [], completedItems: []};
const WEEK_LIST    = {listID: 3, listName: "This Week", listIcon: weekIcon  , toDoItems: [], completedItems: []}; 

class ListPanelView extends React.Component {

  constructor() {
    super();

    this.state = {
      listItems: [ INBOX_LIST, STARRED_LIST, TODAY_LIST, WEEK_LIST],
      folderItems: [],
      isModalShown: false,
      whichModal: "",
      itemName: "",
      listID: 4,
      folderID: 0
    }
  }

  render() {
    const static_lists = this.state.listItems.slice(1, 4);
    const addedLists = this.state.listItems.slice(4,this.state.listItems.length); 
    
    return (
      <div className="lists-container">
        <SearchContainer/>

        <div className="static-lists-container">
          { this.renderInboxList() }
          {static_lists.map((list) => {
            return <ListItem listItem = { list } key= {list.listID} id= {list.listID}
            setSelectedList={this.sendToAppView}/>
           })};
        </div>

        <div className="folder-items-container">
          {this.state.folderItems.map((folder) => {
            return <FolderItem folderItem={ folder } key={folder.folderID} id={folder.folderID}/>
          })}
        </div>

        <div className="list-items-container">
           {addedLists.map((list) => {
            return <ListItem listItem = { list } key= {list.listID} id= {list.listID}
            setSelectedList={this.sendToAppView}/>
           })};
        </div>

        <ButtonContainer displayModal={this.openModalBox}/>

        <ModalContainer isModalShown={this.state.isModalShown}
                        closeModal={this.closeModal}
                        whichModal={this.state.whichModal}
                        itemName={this.addItem}/>
      </div>
    );
  }

  renderInboxList = () => {
    const list = this.state.listItems[0];
    return <ListItem listItem = { list } key= {list.listID} id={list.listID}
                    setSelectedList={this.sendToAppView}/>
  }

  sendToAppView = (list) => {
    this.setState({
      selectedList: list
    });

    this.props.selectedList(list);
  } 

  addItem = (itemName) => {
    this.setItemName(itemName);

    if (this.state.whichModal === 'list') {
      this.setState(prevState =>({
        listItems:[...this.state.listItems, { listID: this.state.listID, 
                                              listName: itemName,
                                              listIcon: listIcon,
                                              toDoItems: [],
                                              completedItems: [] }],
           listID: prevState.listID + 1
      }));
    } else {
      this.setState(prevState =>({
        folderItems:[...this.state.folderItems, { folderID: this.state.folderID, 
                                                  folderName: itemName, 
                                                  listGroup: [] }],
           folderID: prevState.folderID + 1
      }));
    }
  }
  
  setItemName(itemName) {
    this.setState({
      itemName: itemName
    });
  }

  removeItem = (item) => {
    if (item.type === 'list') {
      this.setState({
        listItems: [...this.state.listItems.filter(list => list.id !== item.id)]
      });
    } else {
      this.setState({
        folderItems: [...this.state.folderItems.filter(folder => folder.id !== item.id)]
      });
    }
  }
  
  openModalBox = (modalName) => {
    this.setState({
      isModalShown: true,
      whichModal: modalName
    });
  }

  closeModal = () => {
    this.setState({
      isModalShown: false
    })
  }
}

export default ListPanelView;