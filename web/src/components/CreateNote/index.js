import React from 'react';
import styled from 'styled-components';

const CreateNoteButton = styled.div`
  border-radius: 49%;
  //border: 1px solid #c5c5c5;
  background: #5d4037;
  width: 3.5rem;
  height: 3.5rem;
  position: fixed;
  bottom: 0.9375rem;
  right: 0.9375rem;
  font-size: 1.575em;
  line-height: 3.5rem;
  text-align: center;
  z-index: 1;
  //filter: opacity(0.97);
  filter: drop-shadow(0 2px 2px #8b6b61);
  color: #efebe9;
  /*
  &::after {
    content: "";
    z-index: -2;
    position: fixed;
    bottom: 1.063rem;
    right: 1.063rem;
    border-radius: 50%;
    //border: 1px solid #8e8e8e;
    //background: linear-gradient(to bottom right, #ededed, #a6a7a8);
    background: #321911;
    filter: drop-shadow(0 0 3px #656565);
    width: 3.75rem;
    height: 3.75rem;
  }
  */
`;

const CreateNote = (props) => (
  <CreateNoteButton onClick={e => {
      e.preventDefault();
      props.toggleCreating();
  }}>
    <i role="img" aria-label="Add Note" className="material-icons">
      create
    </i>
  </CreateNoteButton>
);

export default CreateNote;
