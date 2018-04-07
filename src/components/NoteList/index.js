import React from 'react';
import styled from 'styled-components';
import Note from '../note';

//import './NoteList.css';


const NoteListWrapper = styled.section`
    margin: 15px 0;
    height: 100%;
`

const NoteList = ({notes, top, resizeNote, updateNotePosition, updateTop}) => {

  const onNoteDrag = (e: SyntethicMouseEvent, id: string) => {
    e.preventDefault();
    if (e.nativeEvent.which !== 1) {
      return false;
    }

    let note = e.currentTarget.parentNode;

    note.style.zIndex = (notes.lenght + 1 * 10).toString();
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
    document.onmouseup = e => {
      console.log('Mouse up');
      note.classList.remove("active");
      document.onmousemove = null;
      document.onmouseup = null;

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

    note.style.zIndex = (notes.lenght + 1).toString();

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

  const onNoteSelect = (e) => {
    const note = e.currentTarget;
    note.style.zIndex = ((notes.lenght + 1) * 10).toString();
    updateTop(top + 1);
  }

  const onScroll = (e) => {
    e.preventDefault();
    console.log(e.touches[0].clientX, e.touches[0].clientY);
  }

  return (
    <NoteListWrapper className="col" onTouchMove={onScroll}>
      {notes.map(note => (
        <Note key={note.id} {...note}
          onNoteDrag={e => {
            onNoteDrag(e, note.id)
          }}
          onNoteResize={e => {
            onNoteResize(e, note.id)
          }}
          onNoteSelect={onNoteSelect}
        />
      ))}
    </NoteListWrapper>
  )
}
export default NoteList;
