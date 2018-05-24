// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import { GET_NOTES } from '../../queries';

import Note from '../../components/Note';
import CreateNote from '../../components/CreateNote';
import NoteEvents from '../../components/Note/events';

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
        <CreateNote />
      </NotesWrapper>
    );
  }
};


export default NotesContainer;
