import appJson from '../../app';

export const isEmptyString = (str) => (str.length === 0) ? true : false;

export const isEnterKeyPressed = (ev) => (ev.key === 'Enter') ? true : false;

export const findCurrentListInJSON = (list) => appJson.listItems[findCurrentListIndex(list)] 

export const findCurrentListOfToDoInJSON = (listID) => {
  const index = appJson.listItems.findIndex(item => item.listID === listID);
  return appJson.listItems[index];
}
export const findSubTask = (list, toDo, subTask) => {
  const currentList = list;
  const currentToDo = findCurrentToDoInJSON(currentList, toDo);

  const index = currentToDo.toDoDetails.subTaskList.findIndex(subTaskItem => subTaskItem.subTaskID === subTask.subTaskID);

  return index;

}

export const findCurrentToDoInJSON = (list, toDo) => {
  const currentList = findCurrentListInJSON(list);
  if (currentList === undefined) return;
  return currentList.toDoItems[findCurrentToDoIndex(currentList, toDo)];
}

export const findSubTaskInJSON = (list, toDo, subTask) => {
  const currentList = findCurrentListInJSON(list);
  const currentToDo = findCurrentToDoInJSON(currentList, toDo);
  return currentToDo.toDoDetails.subTaskList[findSubTaskIndex(currentList, currentToDo, subTask)];
}

export const findCurrentListIndex = (list) => {
  if (list === undefined) return;
  const index = appJson.listItems.findIndex(listItem => listItem.listID === list.listID);
  return index;
}

export const findCurrentToDoIndex = (list, toDo) => {
  if (list === undefined) return;
  const index = list.toDoItems.findIndex(toDoItem => toDoItem.toDoID === toDo.toDoID);
  return index;
}

export const findSubTaskIndex = (list, toDo, subTask) => {
  const currentList = findCurrentListInJSON(list);
  const currentToDo = findCurrentToDoInJSON(currentList, toDo);

  const index = currentToDo.toDoDetails.subTaskList.findIndex(subTaskItem => subTaskItem.subTaskID === subTask.subTaskID);

  return index;
}

export const getAllToDos = () => {
  const nonStaticLists = appJson.listItems.slice(4, appJson.listItems.length);
  const lists = [appJson.listItems[0]].concat(nonStaticLists);
  let todos = [];

  lists.forEach(list => {
    list.toDoItems.forEach(toDo => {
      toDo.listID = list.listID;
      toDo.listName = list.listName;
      todos.push(toDo);
    }) 
  }); 
  
  return todos;
}

export const groupByListID = (list) => {
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

export const orderToDoSet = (toDoSet) => {
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


