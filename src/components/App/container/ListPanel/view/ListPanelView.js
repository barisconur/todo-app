import React from 'react';
import '../view/ListPanelView';
import SearchContainer from '../container/SearchContainer';
import ButtonContainer from '../container/ButtonContainer';
import ModalContainer from '../container/ModalContainer';
import ListItem from '../container/ListItem';

class ListPanelView extends React.Component {
  constructor() {
    super();

    this.state = {
      listItems: [],
      folderItems: [],
      isModalShown: false,
      whichModal: "",
      itemName: "",
      selectedList: "",
      listID: 0,
      folderID: 0
    }
  }

  render() {
    return (
      <div className="lists-container">
        <SearchContainer/>
        <div className="list-items-container">
        { this.state.listItems.map((list) => {
          return <ListItem listItem={ list } key={ list.id } id={ list.id } setSelectedList={ this.sendToAppView }/>
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
        listItems:[...this.state.listItems, { id: this.state.listID, name: itemName, type:'list', toDoItems: [] }],
        listID: prevState.listID + 1
      }));
    } else {
      this.setState(prevState =>({
        folderItems:[...this.state.folderItems, { id:this.state.folderID, name:itemName, type:'folder', folderItems: [] }],
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