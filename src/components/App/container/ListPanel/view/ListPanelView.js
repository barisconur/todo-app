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

import { INBOX_LIST, STARRED_LIST, TODAY_LIST, WEEK_LIST } from '../../../../constants';

class ListPanelView extends React.Component {

  constructor() {
    super();

    this.state = {
      listItems: [INBOX_LIST, STARRED_LIST, TODAY_LIST, WEEK_LIST],
      folderItems: [],
      isModalShown: false,
      whichModal: "",
      itemName: "",
      listID: 4,
      folderID: 0
    }
  }

  render() {
    console.log(this.props.updateList, "appview e gelen");
    console.log("ListPanelViewdaki listeler",this.state.listItems);
    const addedLists = this.state.listItems.slice(4,this.state.listItems.length); 
    const timeLists = this.state.listItems.slice(2,4);
    return (
      <div className="lists-container">
        <SearchContainer/>

        <div className="static-lists-container">
          { this.renderInboxList() }
          { this.renderStarredList() }
          {timeLists.map((list) => {
            return <TimeListItem listItem= { list }  key= {list.listID}
                    setSelectedList={this.sendToAppView} />
           })}
        </div>

        <div className="folder-items-container">
          {this.state.folderItems.map((folder) => {
            return <FolderItem folderItem={ folder } key={folder.folderID} id={folder.folderID}/>
          })}
        </div>

        <div className="list-items-container">
           {addedLists.map((list) => {
            return <ListItem listItem = { list } key= {list.listID}
            setSelectedList={this.sendToAppView} listToRemove={this.removeList}
            />
           })}
        </div>
        <ButtonContainer displayModal={this.openModalBox}/>

        <ModalContainer isModalShown={this.state.isModalShown}
                        closeModal={this.closeModal}
                        whichModal={this.state.whichModal}
                        itemName={this.addItem}
                        listNames={this.props.listNames}
                        folderNames={this.props.folderNames}/>
      </div>
    );
  }

  renderInboxList = () => {
    const list = this.state.listItems[0];
    return <ListItem listItem= { list } key= {list.listID} id={list.listID}
                    setSelectedList={this.sendToAppView}
                     />
  }

  renderStarredList = () => {
    const list = this.state.listItems[1];
    return <StarredListItem listItem= { list }  key= {list.listID}
                    setSelectedList={this.sendToAppView} />
  }

  sendToAppView = (list) => {
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
      }), () => {
        this.props.sendListNameToAppView(this.state.itemName)
      });
    } else {
      this.setState(prevState =>({
        folderItems:[...this.state.folderItems, { folderID: this.state.folderID, 
                                                  folderName: itemName, 
                                                  listGroup: [] }],
           folderID: prevState.folderID + 1
      }), () => {
        this.props.sendFolderNameToAppView(this.state.itemName);
      });
    }
  }
  
  setItemName(itemName) {
    this.setState({
      itemName: itemName
    });
  }

  removeList = (listWillBeRemoved) => {
    console.log(listWillBeRemoved, "lispanelde silinecek liste");
    console.log(this.state.listItems,"listpaneldeki itemler");
      this.setState({
        listItems: [...this.state.listItems.filter(list => list.listID !== listWillBeRemoved.listID)]
      }, () => {
        console.log(this.state.listItems, "silindikten sonra kalan liste");
      });
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