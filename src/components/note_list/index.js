import React, { Component } from 'react';
import Note from '../note';

import './NoteList.css';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      editing: -1
    }
  }

  render() {
    return (
      <div className="NoteContainer col-sm">
      {this.props.notes.map(({ id, content }) =>
        <Note id={id} key={id} content={content}
          dragStartHandler={this.props.dragStartHandler}
          resizeDownHandler={this.props.resizeDownHandler}
        />
      )}
      </div>
    )
  }
}
export default NoteList;
