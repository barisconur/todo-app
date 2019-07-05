import React from 'react';
import '../view/ListPanelView';
import SearchContainer from '../container/SearchContainer';
import ButtonContainer from '../container/ButtonContainer';
import ModalContainer from '../container/ModalContainer';
import ListItem from '../container/ListItem';
import FolderItem from '../container/FolderItem';

class ListPanelView extends React.Component {
  constructor() {
    super();

    this.state = {
      listItems: [],
      folderItems: [],
      isModalShown: false,
      whichModal: "",
      itemName: "",
      listID: 0,
      folderID: 0
    }
  }

  render() {
    return (
      <div className="lists-container">
        <SearchContainer/>

        <div className="folder-items-container">
        { this.state.folderItems.map((folder) => {
          return <FolderItem folderItem={ folder } 
                            key={ folder.folderID } id={ folder.folderID }/>
        })}

        </div>
        <div className="list-items-container">
        { this.state.listItems.map((list) => {
          return <ListItem listItem={ list } 
                          key={ list.listID } id={ list.listID } 
                          setSelectedList={ this.sendToAppView }/>
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