import React from 'react';
import { Button } from 'react-bootstrap';
import ToDoItem from '../container/ToDoItem';
import searchIcon from '../../../../../assets/icons/search-big-icon.svg';
import appJson from '../../../../../app';
import '../view/ToDoPanelView.css';

const shortid = require('shortid');

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listItems: appJson.listItems,
      toDos: [],
      toDoSet: [],
    };
  }

  componentWillMount() {
    this.setToDos();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchedWord !== prevProps.searchedWord) {
      this.setToDos();
    }
  }
  
  setToDos = () => { 
    const listItems = this.state.listItems;
    let todos = [];

    listItems.forEach(listItem => {
      listItem.toDoItems.forEach(toDoItem => {
        toDoItem.listID = listItem.listID;
        toDoItem.listName = listItem.listName;

        todos.push(toDoItem);
      }) 
    }); 
    this.setState({
      toDos: todos
    }, () => {
      this.searchInSet(this.state.toDos);
    })
  }

  searchInSet = (todos) => { 
    const foundedToDos = this.search(todos);
    const toDoSet = this.groupBylistID(foundedToDos);
    const orderedToDoSet = this.orderToDoSet(toDoSet);

    this.setState({
      toDoSet: orderedToDoSet
    });
  }

  search = (list) => {
    if (list === undefined) return;

    const searchedWord = this.props.searchedWord;
    return list.filter(toDoItem => toDoItem.toDoName.toLowerCase().includes(searchedWord.toLowerCase()));
  } 
  
  groupBylistID = (list) => {
    if (list === undefined) return;

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

  orderToDoSet = (toDoSet) => {
    let newToDoSet = [];

    toDoSet.forEach(toDoItems => {
      let incompletedToDos = [];
      let completedToDos = [];
      let orderToDoArr  = [];

      toDoItems.forEach((toDoItem) => {
        if (!toDoItem.toDoStatus.isCompleted) {
        incompletedToDos.push(toDoItem);
        } else { 
        completedToDos.push(toDoItem);
        }
      })
      orderToDoArr = incompletedToDos.concat(completedToDos);
      newToDoSet.push(orderToDoArr);
    });

    return newToDoSet;
  }

  render() { 
    const toDoSet = this.state.toDoSet;    
    return (
      <div className="search-panel-container"> { this.renderSearchPanel(toDoSet) } </div>
     
    );
  }

  renderSearchPanel = (toDoSet) => {
    if (toDoSet === undefined) return;

    if (toDoSet.length === 0) {
      return this.renderNotFoundPanel()
    } else {
      return <div className="todo-group-container"> { this.renderToDoSet() } </div>
    }
  }

  renderNotFoundPanel = () => {
    return <div className="not-found-container">
             <img className="search-img" src={searchIcon} alt="search-img"></img>
             <h2 className="searched-word-text">{'"'+ this.props.searchedWord + '" is not found'}</h2>
           </div>
  }

  renderToDoSet = () => {
    const toDoSet = this.state.toDoSet;
    if (toDoSet !== undefined) {
        return toDoSet.map((toDoGroup => {
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
      return <div className="search-todo-item-wrapper">
              <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
              updateToDoChanges= {this.props.updateThisSelectedList} isSearchRendering= {true}
              updateThisSearchPanel= {this.updateListItems} />
            </div>
    })
  }

  updateListItems = (updatedListItems) => {
    this.setState({
      listItems: updatedListItems
    }, () => {
      this.setToDos();
    });
  }
} 
