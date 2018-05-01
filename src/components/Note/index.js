// @flow

import React from 'react';
import styled from 'styled-components';
//import './Note.css';
//import './Colors.css';

type Props = {
  id: number,
  content: string,
  onNoteDrag: SyntethicMouseEvent,
  onNoteResize: SyntethicMouseEvent
};

const NoteWrapper = styled.div`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 4rem;
  max-height: 14rem;
  padding: 0.625rem 0.9375rem;
  vertical-align: top;

  overflow: hidden;

  transform: translateZ(0);
  filter: drop-shadow(-1px 2px 1px #656363) /*opacity(0.85)*/;
  //box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  // Second style of material design
  //box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  //transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  color: rgba(0,0,0,0.8);
  background: rgb(255, 228, 0);

/*
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
*/

  &:nth-child(n+2) {
    margin-top: 0.75rem;
  }

  @media (min-width: 576px) {
    min-width: 48.7%;
    max-width: 48.7%;
    width: auto;
    display: inline-block;
    margin-right: 0.938rem;
    margin-bottom: 0.75rem;

    &:nth-child(even) {
      margin-right: 0; 
    }

    &:nth-child(n+2) {
      margin-top: 0;
    }
  }

  @media (min-width: 768px) {
    position: absolute;
    background: none;
    width: 15rem;
    height: 15rem;
    min-width: 13rem;
    min-height: 13rem;
    max-width: 32rem;
    max-height: 32rem;

    &::before {
      z-index: -2;
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgb(255, 228, 0);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2.813rem), calc(100% - 2.813rem) calc(100% - 2.813rem), calc(100% - 2.813rem) 100%, 0 100%);
    }
  }

  @media (min-width: 992px) {
    width: 18rem;
    height: 18rem;
    padding: 0;
  }
`;

const NoteText = styled.p`
  overflow: hidden;
  height: 100%;
  min-height: 1.125rem;
  max-height: 12.33375rem;
  margin-bottom: 0;

  @media (min-width: 992px) {
    padding: 0.625rem 0.9375rem; 
  }
`;

const NoteResizer = styled.div`
  @media (min-width: 768px) {
    filter: drop-shadow(-3px 1px 3px #777) opacity(0.9);
    position: absolute;
    bottom: 0;
    right: 0;
    width: 2.813rem;
    height: 2.813rem;
    /*
    shape-outside: polygon(0 0, 0 100%, 100% 0);
    shape-margin: 10px;
    */

    &::before {
      background: rgb(255, 228, 0);
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 2.813rem;
      height: 2.813rem;
      clip-path: polygon(0 0, 0 100%, 100% 0);

      float: right;
      shape-outside: margin-box;
      margin: 5px 0 0 5px;

    }

    &:hover {
      cursor: nwse-resize;
    }
  }
`;

const NoteDragger = styled.div`
  @media (min-width: 992px) {
    background: repeating-linear-gradient(
      45deg,
      #aaa,
      #aaa 10px,
      #333 10px,
      #333 20px
    );
    filter: opacity(0.3);

    cursor: grab;
    /* content: ""; */
    width: 100%;
    height: 1.2rem;
    cursor: grab;
  }
`;

const NoteDelete = styled.div`
  float: right;
  color: red;
`;

const Note = (props: Props) => (
    <NoteWrapper>
    <NoteDelete onClick={props.onNoteDelete}>&#128473;</NoteDelete>
    <NoteDragger onMouseDown={props.onNoteDrag} />
    <NoteText>
        {props.content}
    </NoteText>
    <NoteResizer onMouseDown={props.onNoteResize} />
  </NoteWrapper>
);

export default Note;
