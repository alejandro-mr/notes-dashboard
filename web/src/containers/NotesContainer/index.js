// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';

import {
  GET_NOTES,
//  GET_NOTES_TOTAL,
  GET_EDITING_STATUS
} from '../../queries';

import {
  TOGGLE_NOTE_EDITING,
  ADD_NOTE
} from '../../mutations';

import Note from '../../components/Note';
import CreateNote from '../../components/CreateNote';
import NoteEvents from '../../components/Note/events';

import NewNoteForm from '../../components/NewNoteForm';

/*
   type Position = {
   x: number,
   y: number,
   x: number
   }

   type Note = {
   id: string,
   title: string,
   content: string,
   position: Position
   }
 */

const NotesWrapper = styled.section`
  margin: 0.938rem;
  height: 100%;
`;

class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      creating: false,
      openModal: false,
    }
  }

  render() {
    return (
      <NotesWrapper>
        <Query query={GET_NOTES}>
          {({ loading, error, data }) => {
             if (loading) return <p>Loading notes...</p>;
             if (error) return <p>An error ocurred...</p>;

             return data.notes.map((note, index) => (
               <Note key={note._id} {...note} {...NoteEvents} />
             ));
          }}
        </Query>

        <Query query={GET_EDITING_STATUS}>
          {({ loading, error, data, refetch }) => {
             if (data.noteEditing) {
               return (
                 <Mutation mutation={TOGGLE_NOTE_EDITING}>
                 {toggleEditing => (
                   <Mutation mutation={ADD_NOTE}>
                     {(addNote, { loading, error }) => (
                       <NewNoteForm toggleCreating={toggleEditing} createNote={(content) => {
                           addNote({
                             variables: {
                               note: {
                                 title: '',
                                 content,
                                 position: {
                                   x: 0,
                                   y: 0,
                                   z: 0
                                 },
                                 width: 268,
                                 height: 268
                               }
                             },
                             update: (cache, { data: { createNote }}) => {
                               const data = cache.readQuery({ query: GET_NOTES });

                               cache.writeQuery({
                                 query: GET_NOTES,
                                 data: {
                                   notes: [
                                     ...data.notes,
                                     createNote
                                   ]
                                 }
                               });
                             },
                             optimisticResponse: {
                               __typename: 'Mutation',
                               createNote: {
                                 __typename: 'Note',
                                 _id: '',
                                 title: '',
                                 content: '',
                                 position: {
                                   __typename: 'Position',
                                   x: 0,
                                   y: 0,
                                   z: 0,
                                 },
                                 width: 268,
                                 height: 268
                               }
                             }
                           });
                       }} />
                     )}
                   </Mutation>
                 )}
                 </Mutation>
               )
             } else {
               return '';
             }
          }}
        </Query>
        <Mutation mutation={TOGGLE_NOTE_EDITING}>
          {toggleEditing => (
            <CreateNote toggleCreating={toggleEditing} />
          )}
        </Mutation>

      </NotesWrapper>
    );
  }
};


export default NotesContainer;
