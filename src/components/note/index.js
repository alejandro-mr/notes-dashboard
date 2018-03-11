// @flow

import React from 'react';
import './Note.css';
import './Colors.css';

type Props = {
  id: number,
  content: string,
  onNoteDrag: SyntethicMouseEvent,
  onNoteResize: SyntethicMouseEvent
};

const Note = (props: Props) => (
  <div className="note">
    <div className="drag" onMouseDown={props.onNoteDrag} />
    <p>
        {props.content}
    </p>
  <div className="fold"
  onMouseDown={props.onNoteResize} />
  </div>
);

export default Note;
