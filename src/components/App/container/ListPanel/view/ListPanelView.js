import React from 'react';
import '../view/ListPanelView';
import SearchContainer from '../container/SearchContainer';
import ButtonContainer from '../container/ButtonContainer';
import ModalContainer from '../container/ModalContainer';
import ListItem from '../container/ListItem';
import FolderItem from '../container/FolderItem';
import StarredListItem from '../container/StarredListItem';
import TimeListItem from '../container/TimeListItem';
import listIcon from '../../../../../assets/icons/list-icon.svg';
import appJson from '../../../../../app';
import { INBOX_LIST, STARRED_LIST, TODAY_LIST, WEEK_LIST } from '../../../../constants';

class ListPanelView extends React.Component {

  constructor() {
    super();

    this.state = {
      isModalShown: false,
      whichModal: "",
      itemName: ""
    }
  }

  render() {
    const timeLists = appJson.listItems.slice(2, 4);
    const addedFolders = appJson.folderItems;
    const addedLists = appJson.listItems.slice(4, appJson.listItems.length);
    
    return (
      <div className="lists-container">
        <SearchContainer/>

        <div className="static-lists-container">
          { this.renderInboxList() }
          { this.renderStarredList() }
          {timeLists.map((list) => {
            return <TimeListItem listItem= { list }  key= {list.listID}/>
           })}
        </div>

        <div className="folder-items-container">
         {addedFolders.map((folder) => {
            return <FolderItem folderItem={ folder } key={folder.folderID} id={folder.folderID}/>
          })}
        </div>

        <div className="list-items-container">
         {addedLists.map((list) => {
            return <ListItem listItem = { list } key= {list.listID}/>
          })}
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
    const list = appJson.listItems[0];
    return <ListItem listItem= { list } key= {list.listID} id={list.listID}/>
  }

  renderStarredList = () => {
     //TO-DO
    const list = appJson.listItems[1];
    return <StarredListItem listItem= { list }  key= {list.listID}/>
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