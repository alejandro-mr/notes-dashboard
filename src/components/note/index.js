// @flow

import React from 'react';
import './Note.css';
import './Colors.css';

type Props = {
  id: number,
  content: string,
  dragStartHandler: SyntethicMouseEvent,
  resizeDownHandler: SyntethicMouseEvent
};

const Note = (props: Props) => (
  <div className="note">
    <div className="drag" onMouseDown={props.dragStartHandler} />
    <p>
        {props.content}
    </p>
  <div className="fold"
    onMouseDown={props.resizeDownHandler} />
  </div>
);

export default Note;
