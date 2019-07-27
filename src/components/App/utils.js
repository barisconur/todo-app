import appJson from '../../app';

export const isEmptyString = (str) => (str.length === 0) ? true : false;

export const isEnterKeyPressed = (ev) => (ev.key === 'Enter') ? true : false;

export const findCurrentListInJSON = (list) => appJson.listItems[findCurrentListIndex(list)]

export const findCurrentToDoInJSON = (list, toDo) => {
  const currentList = findCurrentListInJSON(list);
  return currentList.toDoItems[findCurrentToDoIndex(currentList, toDo)];
}

export const findSubTaskInJSON = (list, toDo, subTask) => {
  const currentList = findCurrentListInJSON(list);
  const currentToDo = findCurrentToDoInJSON(currentList, toDo);
  return currentToDo.toDoDetails.subTaskList[findSubTaskIndex(currentList, currentToDo, subTask)];
}

export const findCurrentListIndex = (list) => {
  const index = appJson.listItems.findIndex(listItem => listItem.listID === list.listID);
  return index;
}

export const findCurrentToDoIndex = (list, toDo) => {
  const index = list.toDoItems.findIndex(toDoItem => toDoItem.toDoID === toDo.toDoID);

  return index;
}

export const findSubTaskIndex = (list, toDo, subTask) => {
  const currentList = findCurrentListInJSON(list);
  const currentToDo = findCurrentToDoInJSON(currentList, toDo);

  const index = currentToDo.toDoDetails.subTaskList.findIndex(subTaskItem => subTaskItem.subTaskID === subTask.subTaskID);

  return index;
}


