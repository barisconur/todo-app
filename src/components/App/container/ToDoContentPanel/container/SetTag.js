import React, { Fragment } from 'react';

import '../view/ToDoContentPanelView.scss';

export default class SetTag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTagged: false
    }
  }

  render() {
    return (
      <Fragment>
         <h2 className="tag-text">Tag: </h2>
         
      </Fragment>   
    );
  }

}