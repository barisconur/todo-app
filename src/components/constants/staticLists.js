import inboxIcon from '../../assets/icons/inbox-icon.svg';
import starIcon from '../../assets/icons/star-icon.svg';
import todayIcon from '../../assets/icons/today-icon.svg';
import weekIcon from '../../assets/icons/this-week-icon.svg';

export const INBOX_LIST   = {listID: 0, listName: "Inbox"    , listIcon: inboxIcon , toDoItems: [], completedItems: []};
export const STARRED_LIST = {listID: 1, listName: "Starred"  , listIcon: starIcon  , toDoItems: [], completedItems: []};
export const TODAY_LIST   = {listID: 2, listName: "Today"    , listIcon: todayIcon , toDoItems: [], completedItems: []};
export const WEEK_LIST    = {listID: 3, listName: "This Week", listIcon: weekIcon  , toDoItems: [], completedItems: []};

export const INBOX_LIST_NAME = "Inbox";
export const STARRED_LIST_NAME = "Starred";
export const TODAY_LIST_NAME = "Today";
export const THIS_WEEK_NAME = "This Week";