// @flow

import * as React from 'react';
/*
import React, {
  Component
} from 'react';
 */
import notesData from '../notes-test.json';
import NoteList from '../components/note_list';
import CreateNote from '../components/CreateNote';

type Note = {
  id: number,
  title: string,
  content: string,
}

type Props = { /* */ }

type State = {
  notes: Array<Note>,
  top: number,
  editing: boolean,
}

class NoteContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      notes: [],
      top: 0,
    };
  }

  componentDidMount() {
    this.setState(notesData);
  }

  onDragStart = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (e.nativeEvent.which !== 1 || this.state.editing) {
      return false;
    }
    let note = e.currentTarget.parentNode;
    let doc = document;

    note.style.zIndex = (this.state.top + 1).toString();
    note.classList.add("active", "NoAnimate");

    this.setState((prev) => {
      return {top: prev.top + 1}
    });

    let offset = note.getBoundingClientRect();
    let shift = {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top
    }
    doc.onmousemove = e => {
      let position = {
        x: (e.pageX - shift.x),
        y: (e.pageY - shift.y)
      }
      note.style.left = position.x + "px";
      note.style.top = position.y + "px";
      //note.style.transform = "translate3d(" + position.x + "px, " + position.y + "px, 0px)";
    }
    note.onmouseup = e => {
      //note.style.left = (e.pageX - shift.x) + "px";
      //note.style.top = (e.pageY - shift.y) + "px";
      note.classList.remove("active", "NoAnimate");
      doc.onmousemove = function() { return false; };
      note.onmouseup = function() {return false; };
    }

    //e.dataTransfer.effectAllowed='move';

  }

  onResizeDownHandler = (e: SyntheticEvent<HTMLDivElement>) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (e.nativeEvent.which !== 1) {
      return false;
    }

    let elem = e.currentTarget;
    let note = e.currentTarget.parentNode;
    note.style.zIndex = this.state.top + 1;
    this.setState((prev) => {
      return {top: prev.top + 1}
    });

    let offset = note.getBoundingClientRect();
    let start = {
      x: e.clientX,
      y: e.clientY,
    }
    //note.draggable = false;
    note.classList.add("NoAnimate");
    document.onmousemove = e => {
      elem.parentNode.style.width =
        (offset.right - offset.left) + (e.clientX - start.x) + "px";
      note.style.height =
        (offset.bottom - offset.top) + (e.clientY - start.y) + "px";
    };
    note.parentNode.onmouseup = e => {
      document.onmousemove = function() { return false; }
      note.parentNode.onmouseup = {};
      note.draggable = true;
      note.classList.remove("NoAnimate");
    }
  }

  onCreateNote = (e) => {
    this.setState((prev) => {
      let sdad = [...prev.notes,{
        id: prev.top + 1,
        title: "New note",
        content: "New note created from blabla"
      }];

      return {
        notes: sdad,
        top: prev.top + 1
      }
      }
    );
  }

  render() {
    return (
      <div className="col-sm">
      <NoteList notes={this.state.notes} editing={this.state.editing}
      dragStartHandler={this.onDragStart}
      resizeDownHandler={this.onResizeDownHandler}
      />
      <CreateNote createNewHandler={this.onCreateNote} />
      </div>
    );
  }
}

export default NoteContainer;
