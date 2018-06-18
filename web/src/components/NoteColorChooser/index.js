import React from 'react';
import styled from 'styled-components';

import { NOTE_COLORS } from '../../constants';

/*
const ChooserWrapper = styled.div`
  background: rgba(256, 256, 256, 0.7);
  position: fixed;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 14rem;
  padding-top: 1rem;
`;
*/

const Chooser = styled.div`
  width: 94%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  grid-auto-rows: minmax(auto, 50px);
`;

const Color = styled.div`
  height: 50px;
  background: ${props => (props.color)};
`;

const NoteColorChooser = (props) => {
  return (
    <Chooser>
      {NOTE_COLORS.map((color, i) => (
        <Color key={i}
          color={color}
          onClick={ e => (props.setColor(color)) }
          ></Color>
      ))}
    </Chooser>
  )
};

export default NoteColorChooser;
