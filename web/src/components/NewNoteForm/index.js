import React, {
  Component
} from 'react';

import styled from 'styled-components';

import ColorChooser from '../NoteColorChooser';
import { NOTE_COLORS } from '../../constants';

const FormWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 14rem;

  z-index: 100;

  background: rgba(256, 256, 256, 0.5);
  //filter: opacity(0.7);

  /*
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 99;

    width: 100%;
    height: 100%;

    background: #FFFFFF;
    filter: opacity(0.7);
  }
  */
`;

const Form = styled.form`
  positions: relative;
  margin: auto;
  padding: 1rem 0;

  //background: transparent;

  width: 94%;
`;

const Title = styled.input`
  margin-bottom: 5px;
  width: 100%;
`;

const Content = styled.textarea`
  width: 100%;
  height: 8rem;
`;

const Submit = styled.input`
  float: right;
`;

class NewNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorSet: false,
      note: {
        title: '',
        content: '',
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        width: 268,
        height: 268,
        color: NOTE_COLORS[0]
      }
    }
  }

  setContent = e => {
    const content = e.target.value
    this.setState((prev, props) => {
       return {
        ...prev,
        note: {
          ...prev.note,
          content: content
        }
      }
    });
  }

  setTitle = e => {
    const title = e.target.value;
    this.setState((prev, _) => {
      return {
        ...prev,
        note: {
          ...prev.note,
          title: title
        }
      }
    });
  }

  setColor = (color) => {
    this.setState((prev, _) => {
      return {
        ...prev,
        note: {
          ...prev.note,
          color: color
        },
        colorSet: true
      }
    });
  }

  submitForm = e => {
    e.preventDefault();
    this.props.createNote(this.state.note);
    this.props.toggleCreating();
  }

  render() {
    return (
      <FormWrapper>
      { !this.state.colorSet &&
        <ColorChooser setColor={this.setColor} />
      }
      { this.state.colorSet &&
        <Form onSubmit={this.submitForm}>
          <Title type="text" value={this.state.title} onChange={this.setTitle} />
          <Content value={this.state.content} onChange={this.setContent} />
          <Submit type="submit" />
        </Form>
      }
      </FormWrapper>
    )
  }
}

export default NewNoteForm;
