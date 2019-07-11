import React from 'react';
import { Button } from 'react-bootstrap';
import ToDoItem from '../container/ToDoItem';
import CompletedItem from '../container/CompletedItem';
import appJson from '../../../../../app';
import '../view/ToDoPanelView.css';

const shortid = require('shortid');

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    let todos = [];
    let completedToDos = [];

    this.setTodos(todos, completedToDos);
    const foundedToDos = this.search(todos);
    const foundedCompleted = this.search(completedToDos);
    
    const toDoSet = this.groupBylistID(foundedToDos);
    const completedSet = this.groupBylistID(foundedCompleted);

    this.setState({
      toDoSet: [...toDoSet],
      completedSet: [...completedSet]
    });
  }

  setTodos = (todos, completedToDos) => {
    appJson.listItems.forEach(listItem => {
      listItem.toDoItems.forEach(toDoItem => {
        toDoItem.listID = listItem.listID;
        toDoItem.listName = listItem.listName;
        todos.push(toDoItem);
      }) 
    }); 

    appJson.listItems.forEach(listItem => {
      listItem.completedItems.forEach(toDoItem => {
        toDoItem.listID = listItem.listID;
        toDoItem.listName = listItem.listName;
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

  render() { 
    return (
      <div className="search-panel-container"> 
        <div className="todo-group-container">
         { this.renderToDoSet() }
        </div>
         
        <div className= "completed-group-container">
          { this.renderCompletedSet() }
        </div>
      </div>
    );
  }

  renderToDoSet = () => {
    if (this.state.toDoSet !== undefined) {
        return this.state.toDoSet.map((toDoGroup => {
          return <div className="todo-item-container">
                   <Button variant="success" className="list-group-tag">
                     {toDoGroup[0].listName}
                   </Button>
                   {this.renderToDoGroupItem(toDoGroup)}
                 </div>
        }))
    }
  }

  renderToDoGroupItem = (toDoGroup) => {
    const listItems = appJson.listItems;
    const currentIndex = listItems.findIndex(listItem => listItem.listID === toDoGroup[0].listID);
    const selectedList = listItems[currentIndex];
    
    return toDoGroup.map((toDoItem) => {
      return <div className="todo-item-wrapper">
              <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
              updateToDoChanges={this.props.updateThisSelectedList} isSearchRendering= {true} 
              updateToDoWithoutSelectList={this.updateSelectedList}/>
            </div>
    })
  }

  renderCompletedSet = () => {
    if (this.state.completedSet !== undefined) {
        return this.state.completedSet.map((toDoGroup => {
          return <div className="completed-item-container">
                  <Button variant="danger" className="list-group-tag">
                    {toDoGroup[0].listName}
                  </Button>
                  {this.renderCompletedGroupItem(toDoGroup)}
                </div>
        }))
    }
  }

  renderCompletedGroupItem = (toDoGroup) => {
    const listItems = appJson.listItems;
    const currentIndex = listItems.findIndex(listItem => listItem.listID === toDoGroup[0].listID);
    const selectedList = listItems[currentIndex];

    return toDoGroup.map((toDoItem) => {
      return <div className="complete-item-wrapper">
              <CompletedItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
              updateToDoChanges={this.props.updateThisSelectedList} isSearchRendering= {true} 
              updateToDoWithoutSelectList={this.updateSelectedList} />
            </div>
    })
  }

  updateToDoWithoutSelectList = (selectedList) => {
    this.props.updateThisSelectedList(selectedList);
  }
}
