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
      listID: 0,
      folderID: 0
    }
  }

  render() {
    return (
      <div className="list-panel-container">
        <SearchContainer/>
        <div>
        { this.state.listItems.map((list) => {
          return <ListItem listItem={ list } key={this.state.listID} id={this.state.listID}/>
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

  closeModal = () => {
    this.setState({
      isModalShown: false
    })
  }
  
  openModalBox = (modalName) => {
    this.setState({
      isModalShown: true,
      whichModal: modalName
    });
  }

  addItem = (itemName) => {
    this.setItemName(itemName);

    if (this.state.whichModal === 'list') {
      this.setState(prevState =>({
        listItems:[...this.state.listItems, { name: itemName, id: this.state.listID }],
        listID: prevState.listID + 1
      }));
    } else {
      this.setState(prevState =>({
        folderItems:[...this.state.folderItems, { name: itemName, id:this.state.folderID}],
        folderID: prevState.folderID + 1
      }));
    }
  }
  
  setItemName(itemName) {
    this.setState({
      itemName: itemName
    });
  }
}

export default ListPanelView;