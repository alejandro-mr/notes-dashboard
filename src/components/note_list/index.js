import React from 'react';
import Note from '../note';

import './NoteList.css';

const NoteList = ({notes, top, resizeNote, updateNotePosition}) => {

  const onNoteDrag = (e: SyntethicMouseEvent, id: string) => {
    e.preventDefault();
    if (e.nativeEvent.which !== 1) {
      return false;
    }

    let note = e.currentTarget.parentNode;

    note.style.zIndex = (top + 1).toString();
    note.classList.add("active");

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
      note.classList.remove("active");
      document.onmousemove = null;
      note.onmouseup = null;

      //Calling action to save new Note position.
      updateNotePosition(id, {
        x: (e.pageX - shift.x),
        y: (e.pageY - shift.y),
        z: (top + 1)
      })
    }
  }

  const onNoteResize = (e: SyntethicMouseEvent, id: string) => {
    e.preventDefault()
    if (e.nativeEvent.which !== 1) {
      return false;
    }

    let note = e.currentTarget.parentNode;

    note.style.zIndex = (top + 1).toString();

    let offset = note.getBoundingClientRect();
    let start = {
      x: e.clientX,
      y: e.clientY,
    }

    document.onmousemove = e => {
      note.style.width =
        (offset.right - offset.left) + (e.clientX - start.x) + "px";
      note.style.height =
        (offset.bottom - offset.top) + (e.clientY - start.y) + "px";
    };
    document.onmouseup = e => {
      document.onmousemove = null;
      document.onmouseup = null;

      //Calling action to save new note size.
      resizeNote(id, note.style.width, note.style.height);
    }
  }

  return (
    <section className="NoteContainer">
      {notes.map(note => (
        <Note key={note.id} {...note}
          onNoteDrag={e => {
            onNoteDrag(e, note.id)
          }}
          onNoteResize={e => {
            onNoteResize(e, note.id)
          }}
        />
      ))}
    </section>
  )
}
export default NoteList;
