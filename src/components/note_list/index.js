import React from 'react';

import './NoteList.css';

const NoteList = (props) => (
  <div
  className="NoteContainer"
  onDrop={props.dropHandler}
  onDragLeave={props.dragLeaveHandler}
  onDragEnter={props.dragEnterHandler}
  onDragOver={props.dragOverHandler}
    onDragEnd={props.dragEndHandler}
  >
    {props.notes.map(({ content }, index) =>
      <div
        className="Note"
        key={index}
        draggable="true"
        onDragStart={props.dragStartHandler}
      >
          {content}
          <div className="Fold">
          </div>
      </div>
    )}
  </div>
);

export default NoteList;
