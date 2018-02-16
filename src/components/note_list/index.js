import React from 'react';

import './NoteList.css';

const NoteList = (props) => (
  <div
    className="NoteContainer col-sm"
/*
    onDrop={props.dropHandler}
    onDragLeave={props.dragLeaveHandler}
    onDragEnter={props.dragEnterHandler}
    onDragOver={props.dragOverHandler}
  onDragEnd={props.dragEndHandler}
  */ 
  >
    {props.notes.map(({ content }, index) =>
      <div
        className="Note"
      key={index}
        //draggable="true"
        //onDragStart={ e => { return false } }
      onMouseDown={props.dragStartHandler}
      //onMouseUp={props.dragEndHandler}
      style={{zIndex: index + 1}}
      >
        <p>
        {content}
        </p>
        <div className="Fold" onMouseDown={props.resizeDownHandler} onMouseUp={props.resizeUpHandler}>
        </div>
      </div>
    )}
  </div>
);

export default NoteList;
