import React from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import '../view/ListPanelView.css';

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.userInput = React.createRef();

    this.state = {
      searchedWord: ""
    }
  }
   render() {
      return (
        <InputGroup className="search-container">
          <FormControl className="search-field"
            ref= {this.userInput}
            placeholder="Search..."
            aria-label="List-name"
            aria-describedby="basic-addon2"
            onChange= {() => this.search()}/>
      </InputGroup>
      );
   }

   search = () => {
    this.setState({
      searchedWord: this.userInput.current.value
    }, () => {
      this.props.sendSearchedWordToAppView(this.state.searchedWord);
    })
   }
}