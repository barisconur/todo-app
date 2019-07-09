import React from 'react';
import '../view/ListPanelView';

import SearchContainer from '../container/SearchContainer';
import ButtonContainer from '../container/ButtonContainer';
import ModalContainer from '../container/ModalContainer';

import ListItem from '../container/ListItem';
import FolderItem from '../container/FolderItem';
import StarredListItem from '../container/StarredListItem';
import TimeListItem from '../container/TimeListItem';
import InboxListItem from '../container/InboxListItem';

import appJson from '../../../../../app';

const shortid = require('shortid');

export default class ListPanelView extends React.Component {
  state = {
      isModalShown: false,
      whichModal: "",
      itemName: "",
      listItems: [],
      folderItems: []
  }

  componentDidMount () {
    Promise.resolve(appJson).then(appJson => {
      this.setState({
        listItems: appJson.listItems,
        folderItems: appJson.folderItems
      });
    })
  }

  render() {
    const timeLists = appJson.listItems.slice(2, 4);
    let addedFolders = this.state.folderItems;
    let addedLists = this.state.listItems.slice(4, this.state.listItems.length);

    return (
      <div className="lists-container">
        <SearchContainer/>

        <div className="static-lists-container">
          { this.renderInboxList() }
          { this.renderStarredList() }
          {timeLists.map((list) => {
            return <TimeListItem listItem= { list }  key= {shortid.generate()} 
            sendSelectedToView={this.sendSelectedListToView}/>
           })}
        </div>

        <div className="folder-items-container">
         {addedFolders.map((folder) => {
          return <FolderItem folderItem= { folder } key= {shortid.generate()} updateFolder= {this.updateFolder}
          sendSelectedToView= {this.sendSelectedListToView}/>
          })}
        </div>

        <div className="list-items-container">
         {addedLists.map((list) => {
            return <ListItem listItem= { list } key= {shortid.generate()} updateList= {this.updateList}
            sendSelectedToView= {this.sendSelectedListToView}/>
          })}
        </div>

        <ButtonContainer displayModal={this.openModalBox}/>

        <ModalContainer isModalShown={this.state.isModalShown}
                        closeModal={this.closeModal}
                        whichModal={this.state.whichModal}
                        itemName={this.addItem}
                        sendSelectedListToView={this.sendSelectedListToView}/>
      </div>
    );
  }

  renderInboxList = () => {
    const list = appJson.listItems[0];
    return <InboxListItem listItem= { list } key= {shortid.generate()}
    sendSelectedToView={this.sendSelectedListToView}/>
  }

  renderStarredList = () => {
    const list = appJson.listItems[1];
    return <StarredListItem listItem= { list }  key= {shortid.generate()}
    sendSelectedToView={this.sendSelectedListToView}/>
  }

  updateList = () => {
    Promise.resolve(appJson.listItems).then(updatedList => {
      this.setState({
        listItems: updatedList
      });
    })
  }

  updateFolder = () => {
    Promise.resolve(appJson.folderItems).then(updatedFolder => {
      this.setState({
        folderItems: updatedFolder
      });
    })
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

  sendSelectedListToView = (selectedList) => {
    this.props.setSelectedList(selectedList);
  }
  
}