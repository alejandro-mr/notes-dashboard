import React from 'react';
import styled from 'styled-components';

import Note from '../Note';
import CreateNote from '../CreateNote';

import { ApolloConsumer, Query } from "react-apollo";
import gql from "graphql-tag";


const NoteListWrapper = styled.section`
  margin: 0.938rem;
  height: 100%;
`;

const NoteList = () => {

  const notes =  []

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
      /*
      updateNotePosition(id, {
        x: (e.pageX - shift.x),
        y: (e.pageY - shift.y),
        z: (top + 1)
      })
      */
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
      //resizeNote(id, note.style.width, note.style.height);
    }
  }

  const onNoteSelect = (e) => {
    const note = e.currentTarget;
    note.style.zIndex = ((notes.lenght + 1) * 10).toString();
    //updateTop(top + 1);
  }

  const onScroll = (e) => {
    e.preventDefault();
    console.log(e.touches[0].clientX, e.touches[0].clientY);
  }

  const onCreateNoteHandler = (e) => {
    e.preventDefault();
    /*
    addNote(
      256,
      'title',
      'lulululululul',
      {
        x: 0,
        y: 0,
        z: 0
      }
    );
    */
  }

  const onNoteDelete = (e, id: numeric) => {
    e.preventDefault();
    //deleteNote(id);
  }

  const onNoteUpdate = (e, note: Note) => {
    e.preventDefault();
    //updateNote(note);
  }

  const GET_NOTES = gql`
    {
      notes {
        _id
        title
        content
        position {
          x
          y
          z
        }
        width
        height
      }
    }
  `;

  return (
    <React.Fragment>
      <NoteListWrapper>
        <Query query={GET_NOTES}>
          {({ loading, error, data }) => {
             if (loading) return <p>Loading notes...</p>;
            if (error) return <p>An error ocurred...</p>;

             return data.notes.map((note, index) => (
               <Note key={note._id} {...note}
               onNoteDrag={e => {
                 onNoteDrag(e, note._id)
               }}
               onNoteResize={e => {
                 onNoteResize(e, note._id)
               }}
               onNoteSelect={onNoteSelect}
               onNoteDelete={e => {
                 onNoteDelete(e, index)
               }}
               onNoteUpdate={e => {
                 onNoteUpdate(e, note)
               }}
               />
             ));

          }}
        </Query>
      </NoteListWrapper>
      <CreateNote createNewHandler={onCreateNoteHandler} />
    </React.Fragment>
  )
}
export default NoteList;
