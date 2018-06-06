// @flow

import React, {
  Component
} from 'react';
import {
  Query,
  Mutation
} from 'react-apollo';
import styled from 'styled-components';

import {
  GET_NOTES,
  //  GET_NOTES_TOTAL,
  GET_EDITING_STATUS
} from '../../queries';

import {
  TOGGLE_NOTE_EDITING,
  ADD_NOTE
} from '../../mutations';

import {
  NOTE_CREATED,
  NOTE_DELETED
} from '../../subscriptions';

import NoteList from '../../components/NoteList';
import CreateNote from '../../components/CreateNote';

import NewNoteForm from '../../components/NewNoteForm';

const NotesWrapper = styled.section `
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
          {({ loading, error, data, subscribeToMore }) => {
             if (loading) return <p>Loading notes...</p>;
             if (error) return <p>An error ocurred...</p>;

             return <NoteList
               notes={data.notes}
               subscribeToNewNotes={() => {
                 subscribeToMore({
                   document: NOTE_CREATED,
                   updateQuery: (prev, { subscriptionData }) => {
                     if (!subscriptionData.data) return prev;

                     return {
                       ...prev,
                       notes: [
                         ...prev.notes,
                         subscriptionData.data.noteAdded
                       ]
                     };
                   }
                 });
               }}
               subscribeToDeletedNote={() => {
                 subscribeToMore({
                   document: NOTE_DELETED,
                   updateQuery: (prev, { subscriptionData }) => {
                     if (!subscriptionData.data) return prev;

                     const index = prev.notes.findIndex(note =>
                       (note._id === subscriptionData.data.noteDeleted._id)
                     );

                     if (index > 0) {
                       return {
                         ...prev,
                         notes: [
                           ...prev.notes.slice(0, index),
                           ...prev.notes.slice(index + 1)
                         ]
                       };
                     } else {
                       return prev;
                     }
                   }
                 });
               }}
             />
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

                                 const exists = data.notes.findIndex(note =>
                                   (note._id === createNote._id)
                                 );

                                 if (exists > 0) return null

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
                                   content: content,
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
