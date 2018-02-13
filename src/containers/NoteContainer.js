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
      }]
    });
  }

  onDragStart(e) {
    let offset = e.currentTarget.getBoundingClientRect();
    e.currentTarget.classList.add('active');
    e.dataTransfer.effectAllowed='move';
    return offset;
  }

  onDragEnd(e) {
    console.log('Drag end');
  }

  onDragOver(e){
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

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

  onDragLeave() {
    console.log('Element leave');
  }

  render() {
    return <NoteList notes={this.state.notes} dropHandler={this.onDrop} dragLeaveHandler={this.onDragLeave} dragStartHandler={this.onDragStart} dragEndHandler={this.onDragEnd} dragOverHandler={this.onDragOver} dragEnterHandler={this.onDragEnter} />
  }
}

export default NoteContainer;
