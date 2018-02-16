import React, {
  Component
} from 'react';
import NoteList from '../components/note_list';

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      top: 0,
      editing: false
    };
  }

  componentDidMount() {
    this.setState({
      notes: [{
        title: "Note 1",
        content: "Hello im a fucking note.",
      },{
        title: "Second note",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },{
        title: "Third",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }],
      top: 3,
      editing: false
    });
  }

  onDragStart = (e) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (e.nativeEvent.which !== 1 || this.state.editing) {
      return false;
    }
    let note = e.currentTarget;

    note.style.zIndex = this.state.top + 1;
    e.currentTarget.classList.add("active", "NoAnimate");

    this.setState((prev) => {
      return {top: prev.top + 1}
    });

    let offset = note.getBoundingClientRect();
    let shift = {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top
    }
    document.onmousemove = e => {
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
      document.onmousemove = function() { return false; };
      note.onmouseup = function() {return false; };
    }

    //e.dataTransfer.effectAllowed='move';

  }

  onDragEnd(e) {
    let note = e.currentTarget;
    note.onmousemove = function () { return false; };
    note.onmouseup = {};
    //e.target.classList.remove("active", "NoAnimate");
  }

  onDragOver(e){
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    //e.currentTarget.classList.remove('active');
    e.dataTransfer.dropEffect = 'move'
    return false;
  }

  onDragEnter(e) {
    return false;
  }

  onDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    return false;
  }

  touchResizeHandler = (e) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (!e.touches) {
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
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    //note.draggable = false;
    note.classList.add("NoAnimate");
    note.parentNode.touchmove = e => {
      elem.parentNode.style.width =
        (offset.right - offset.left) + (e.touches[0].clientX - start.x) + "px";
      note.style.height =
        (offset.bottom - offset.top) + (e.touches[0].clientY - start.y) + "px";
    };
    note.toucend = e => {
      note.parentNode.touchmove = function() { return false; }
      note.touchend = {};
      note.draggable = true;
      note.classList.remove("NoAnimate");
    }
  }

  onResizeDownHandler = (e) => {
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

  onResizeUpHandler(e) {
    e.stopPropagation();
    e.currentTarget.onmousemove = false;
    e.currentTarget.parentNode.classList.remove('NoAnimate');
  }

  onDragLeave = (e) => {
    return false;
  }

  onDoubleClick = (e) => {
    /*
    this.setState({
      editing: true
    });
    */
    let note = e.target.parentNode;
    note.classList.add("NoAnimate");
  }

  onTextEdit = (index, val) => {
    /*
    this.setState({
      notes: update(this.state.notes, {index: {content: {$set: val}}})
    });
    */
  }

  onTextChange = (e) => {
    console.log(e.target.parentNode)
  }

  render() {
    return <NoteList notes={this.state.notes}
             editing={this.state.editing}
             dropHandler={this.onDrop}
             dragLeaveHandler={this.onDragLeave}
             dragStartHandler={this.onDragStart}
             dragEndHandler={this.onDragEnd}
             dragOverHandler={this.onDragOver}
    dragEnterHandler={this.onDragEnter}
    resizeDownHandler={this.onResizeDownHandler}
      resizeUpHandler={this.onResizeUpHandler}
    touchResizeHandler={this.touchResizeHandler}
    doubleClickHandler={this.onDoubleClick}
    textEditHandler={this.onTextEdit}
    textChangeHandler={this.onTextChange}
    />
    }
}

export default NoteContainer;
