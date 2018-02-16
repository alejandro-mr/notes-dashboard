import React, {
  Component
} from 'react';
import NoteList from '../components/note_list';

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = { notes: [] };
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
      top: 3
    });
  }

  onDragStart = (e) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (e.nativeEvent.which !== 1) {
      return false;
    }

    let note = e.currentTarget;
    note.style.zIndex = this.state.top + 1;
    this.setState((prev) => {
      return {top: prev.top + 1}
    });

    let offset = note.getBoundingClientRect();
    let shift = {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top
    }
    e.currentTarget.classList.add("active", "NoAnimate");
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
    note.parentNode.onmousemove = e => {
      elem.parentNode.style.width =
        (offset.right - offset.left) + (e.clientX - start.x) + "px";
      note.style.height =
        (offset.bottom - offset.top) + (e.clientY - start.y) + "px";
    };
    note.onmouseup = e => {
      note.parentNode.onmousemove = function() { return false; }
      note.onmouseup = {};
      note.draggable = true;
      note.classList.remove("NoAnimate");
    }
  }

  onResizeUpHandler(e) {
    e.stopPropagation();
    e.currentTarget.onmousemove = false;
    e.currentTarget.parentNode.classList.remove('NoAnimate');
  }

  onDragLeave() {
  }

  render() {
    return <NoteList notes={this.state.notes}
             dropHandler={this.onDrop}
             dragLeaveHandler={this.onDragLeave}
             dragStartHandler={this.onDragStart}
             dragEndHandler={this.onDragEnd}
             dragOverHandler={this.onDragOver}
    dragEnterHandler={this.onDragEnter}
    resizeDownHandler={this.onResizeDownHandler}
    resizeUpHandler={this.onResizeUpHandler}
    />
    }
}

export default NoteContainer;
