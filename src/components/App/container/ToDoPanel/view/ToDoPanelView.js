import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';
import CompletedItem from '../container/CompletedItem';
import '../view/ToDoPanelView';
import appJson from '../../../../../app';

const shortid = require('shortid');

export default class ToDoPanelView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCompletedShown: false,
      searchedWord: this.props.searchedWord
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.renderThisSelectedList !== prevProps.renderThisSelectedList) {
      this.setState({
        isCompletedShown: false,
      });
    }

    if (this.props.isClicked !== prevProps.isClicked) {
      this.setState({
        searchedWord: ""
      });
    }
  }

  render() {
    return (
      <div className="todo-container"> 
        { this.displayPanel () }
      </div>
    );
  }


  displayPanel = () => {
    if (this.props.searchedWord.length !== 0) {
      return <SearchPanel searchedWord= {this.state.searchedWord} updateThisSelectedList= {this.sendSelectedListToAppView}/>
    } else {
      const selectedList = this.props.renderThisSelectedList;

      return ( 
        <div className="render-todo-container">
        <Navbar newSelectedListName= {selectedList.listName}/>
       { this.renderAddToDoComponent() }

       <div className="todo-items-container">
         { this.renderToDoItems() }
       </div>

       <div className="completed-items-container">
         { this.showCompletedButton() }
         { this.renderCompletedItems() }
       </div>
     </div>
      )
    }
  }

  renderAddToDoComponent = () => {
    const selectedList = this.props.renderThisSelectedList;
    return <AddToDo selectedList= {selectedList} updateToDoChanges={this.sendSelectedListToAppView}/>
    
  }

  renderToDoItems = () => {
    const selectedList = this.props.renderThisSelectedList;

    if (selectedList !== undefined) {
      if (selectedList.toDoItems !== undefined) {
        return selectedList.toDoItems.map((toDoItem) => {
          return <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
          updateToDoChanges={this.sendSelectedListToAppView}/>
        })
      }
    }
  }

  showCompletedButton = () => {
    const selectedList = this.props.renderThisSelectedList;

    if (selectedList.completedItems !== undefined) {
      if(selectedList.completedItems.length === 0) return;
        return <Button className="show-completed-btn" variant="dark" size="sm" onClick={this.toggleShowButton}>
                SHOW COMPLETED TO-DOS
              </Button>
    }
  }

  toggleShowButton = () => {
    this.setState({
      isCompletedShown: !this.state.isCompletedShown
    });
  }
  
  renderCompletedItems = () => {
    if(!this.state.isCompletedShown) return;
    const selectedList = this.props.renderThisSelectedList;

    if (selectedList !== undefined) {
      if (selectedList.completedItems !== undefined) {
        return selectedList.completedItems.map((toDoItem) => {
          return <CompletedItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
          updateToDoChanges={this.sendSelectedListToAppView}/>
        })
      }
    }
  }

  sendSelectedListToAppView = (newSelectedList) => {
    this.props.updateThisSelectedList(newSelectedList);
  }
}

class SearchPanel extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      groupToDos: [],
      groupComple: []
    }
  }

  componentDidMount() {
    let todos = [];
    let completedToDos = [];

    this.setTodos(todos, completedToDos);
    const foundedToDos = this.search(todos);
    const foundedCompleted = this.search(completedToDos);
    
    const groupToDos = this.groupBylistID(foundedToDos);
    const groupCompleted = this.groupBylistID(foundedCompleted);

    this.setState({
      groupToDos: [...groupToDos],
      groupCompleted: [...groupCompleted]
    });
  }

  render() {
    return (
      <div className="search-panel-container">
        <div className="todos-container">
          <div className="todo-groups-container">
            { this.renderAllListGroups(this.state.groupToDos) }
          </div>
        </div>

        <div className="completed-container">
          <hr></hr>
          <div className="completed-groups-container">
            {/* { this.renderAllListGroups(this.state.groupCompleted) } */}
          </div>

        </div>
      </div>
    );
  }

  renderAllListGroups = (list) => {
    const listGroups = list;
    if (listGroups !== undefined) {
      if (list === this.state.groupToDos) {
        return listGroups.map((group) => {
          return this.renderToDoListGroup(group);
        })
      } else {
        return listGroups.map((group) => {
          return this.renderCompletedListGroup(group);
        })
      }
    }
  }

  renderToDoListGroup = (listGroup) => {
    const listItems = appJson.listItems;
    const currentIndex = listItems.findIndex(listItem => listItem.listID === listGroup[0].listID);
    const tag = listItems[currentIndex].listName;
    const selectedList = listItems[currentIndex];

    return <Fragment>
              <Button variant="success" className="list-group-tag">
              <h1>{tag}</h1>
            </Button> 
            {listGroup.map(toDoItem => {
              return <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
              updateToDoChanges={this.sendSelectedListToAppView}/>
            })}
           </Fragment>
  }

  renderCompletedListGroup = (listGroup) => {
    const listItems = appJson.listItems;
    const currentIndex = listItems.findIndex(listItem => listItem.listID === listGroup[0].listID);
    const tag = listItems[currentIndex].listName;
    const selectedList = listItems[currentIndex];

    console.log(listGroup);
    return <Fragment>
            <Button variant="success" className="list-group-tag">
                    <h1>{tag}</h1>
                  </Button> 
                  {listGroup.map(toDoItem => {
                    return <CompletedItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
                    updateToDoChanges={this.sendSelectedListToAppView}/>
                  })}
            </Fragment>
  }

  sendSelectedListToAppView = (newSelectedList) => {
    this.props.updateThisSelectedList(newSelectedList);
  }

  setTodos = (todos, completedToDos) => {
    appJson.listItems.forEach(listItem => {
      listItem.toDoItems.forEach(toDoItem => {
        toDoItem.listID = listItem.listID;
        todos.push(toDoItem);
      }) 
    }); 

    appJson.listItems.forEach(listItem => {
      listItem.completedItems.forEach(toDoItem => {
        toDoItem.listID = listItem.listID;
        completedToDos.push(toDoItem);
      })
    });
   }

  search = (list) => list.filter(toDoItem => toDoItem.toDoName.toLowerCase().includes(this.props.searchedWord.toLowerCase()));
  
  groupBylistID = (list) => {
    let remainingList = list;
    let groupArr = [];
    while (remainingList.length !== 0) {
      let listGroup = [];
      let firstToDo = remainingList[0];
      remainingList.splice(0, 1); 
      listGroup.push(firstToDo);

      for (let i = 0; i < remainingList.length; i++) {
        if (firstToDo.listID === remainingList[i].listID) {
          listGroup.push(remainingList[i]);
          remainingList.splice(i, 1);
          i--;
        }
      }
      groupArr.push(listGroup);
      listGroup = [];
    }
    return groupArr;
  }
}