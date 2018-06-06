import React, {
  Component
} from 'react';
import styled from 'styled-components';

import Note from '../Note';
import NoteEvents from '../Note/events';

const NoteListWrapper = styled.section `
`;

class NoteList extends Component < Props > {
  componentDidMount() {
    this.props.subscribeToNewNotes();
    this.props.subscribeToDeletedNote();
  }

  render() {
    return (
      <NoteListWrapper>
        {this.props.notes.map((note, index) => (
          <Note key={note._id} {...note} {...NoteEvents} />
        ))}
      </NoteListWrapper>
    )
  }
}

export default NoteList;
