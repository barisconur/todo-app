import React from 'react';
import Search from './Search';
import CreatePanel from './CreatePanel';

export default class AppMainPage extends React.Component {
  state = {
    listItems: ["Inbox"]
  };
  render() {
    return (
      <div>
        <Search/>
        <CreatePanel/>
      </div>
    );
  };
  
  createListItem = () => {
     //TO-DO
  };

  removeListItem = () => {
    //TO-DO
  };

  renameListItem = () => {
    //TO-DO
  };

  copyListItem = () => {
    //TO-DO
  };

  duplicateListItem = () => {
    //TO-DO
  };

  moveListItemInFolder = () => {
    //TO-DO
  };

  printListItem = () => {
    //TO-DO
  };

}


  