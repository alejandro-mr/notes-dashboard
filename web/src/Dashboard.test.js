import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import NotesContainer from './containers/NotesContainer';

let wrapper;
beforeEach(() => {
    wrapper = shallow(<Dashboard />);
})

it('renders without crashing', () => {
  expect(wrapper).toExist();

});

it('renders NotesContainer component', () => {
    shallow(<NotesContainer />);
});
