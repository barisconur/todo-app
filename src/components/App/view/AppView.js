import React from 'react';
import Grid from '@material-ui/core/Grid';
import './AppView';
import { Paper } from '@material-ui/core';

export default class AppView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    //   allLists: [],
    //   toDoItemWillBeRegistered: undefined,
    //   selectedListObject: {},
    //   selectedListName: "Select List",
    //   allItemsInSelectedList: []
    };

  }
  render() {
    return (
      <div>
        <Grid container alignItems="stretch">
          <Grid className="left-panel" item sm={3}>
            <Paper >listpanel</Paper>
          </Grid>

          <Grid className="todo-panel" item sm={7}>
            <Paper>todopanel</Paper>
          </Grid>

          <Grid className="right-panel" item sm={2}>
            <Paper>rightpanel</Paper>
          </Grid> 
        </Grid>
      </div>
    );
  };
}
//   addList = (listName, index) => {
//       this.setState(() => ({
//         allLists: [...this.state.allLists, {name: listName, id: index}]
//       }));
//   }

//   removeList = (id) => {
//     this.setState({
//        allLists: [...this.state.allLists.filter(list => list.id !== id)]
//     });
//   }

//   setSelectedList = (listName) => {
//     this.clearAllItemsComingFromPreviousSelectedList(); // BURADA DATA GELMEDEN RENDER ATIYOR BUG1
//     const lists = this.state.allLists;
//     for (let i = 0; i < lists.length;i++) {
//       if ( lists[i].name === listName) {
//         this.setState(({
//           selectedListObject: lists[i]
//         }));
//       }
//     }
//     this.setSelectedListName();
//     // console.log(this.state.selectedListObject);
//   }

//   clearAllItemsComingFromPreviousSelectedList = () => {
//     this.setState({
//       allItemsInSelectedList: []
//     })
//   }

//   setSelectedListName = () => {
//     this.setState({
//       selectedListName: this.state.selectedListObject.name
//     })
//   }

//   setInput = () => {
//     this.setState({
//       toDoItemWillBeRegistered: this.userInput.current.value
//     });
//     // console.log(this.state.toDoItemWillBeRegistered);
//   }

//   addToDoItem = () => {
//     const allItems = this.state.allItemsInSelectedList;
    
//     this.setState({
//       allItemsInSelectedList: [...allItems, {name: this.state.toDoItemWillBeRegistered}]
//     });

//     // console.log(this.state.allItemsInSelectedList);
//   }

//   isSelectedList = (list) => {
//     return this.state.selectedListObject === list;
//   }
// }
