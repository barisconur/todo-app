import React, { Fragment } from 'react';

import SearchContainer from '../container/SearchContainer';
import ButtonContainer from '../container/ButtonContainer';
import CreateItemModal from '../container/CreateItemModal';

import ListItem from '../container/ListItem';
import FolderItem from '../container/FolderItem';

import appJson from '../../../../../app';

import '../view/ListPanelView.scss';

const shortid = require('shortid');

export default class ListPanelView extends React.Component {
  state = {
    isModalShown: false,
    whichModal: "",
  }

  sendSelectedListToAppView = (selectedList) => { this.props.setSelectedList(selectedList) }

  sendSearchedWordToAppView = (searchedWord) => { this.props.setSearchedWord(searchedWord) }

  render() {
    return (
      <Fragment>
        <SearchContainer sendSearchedWordToView= {this.sendSearchedWordToAppView}
        updateSearchField = {this.props.updateSearchField} />

        <div className="lists-container">
          <div className="static-lists-container">
            { this.renderStaticLists() }
          </div>

          <div className="folder-items-container">
            { this.renderFolderItems() }
          </div>

          <div className="list-items-container">
            { this.renderAddedLists() }
          </div>
        </div>

        <ButtonContainer displayModal= {this.openModalBox}/>

        <CreateItemModal isModalShown= {this.state.isModalShown}
                          closeModal= {this.closeModalBox}
                          whichModal= {this.state.whichModal}
                          sendSelectedListToAppView= {this.sendSelectedListToAppView}/>
      </Fragment>
    );
  }

  renderStaticLists = () => {
    const staticLists = appJson.listItems.slice(0, 4);
    return staticLists.map((list) => {
      return <ListItem listItem={ list } key={shortid.generate()} sendSelectedToView={this.sendSelectedListToAppView}/>
    })
  }

  renderFolderItems = () => {
    return appJson.folderItems.map((folder => {
      return <FolderItem folderItem={ folder } key={shortid.generate()} updateFolder={this.updateFolder}/>
    }))
  }

  renderAddedLists = () => {
    const newListItems = appJson.listItems.slice(4, appJson.listItems.length);
    console.log(newListItems);
    return newListItems.map((list) => {
      return <ListItem listItem={ list } key={shortid.generate()} 
      sendSelectedToView={this.sendSelectedListToAppView} updateList={this.updateList}/>
    })
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

  closeModalBox = () => {this.setState({ isModalShown: false })}
}