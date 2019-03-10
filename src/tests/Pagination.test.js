import React from 'react';
import Pagination from '../components/Pagination';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const component = shallow(
    <Pagination />
  );
  expect(component).toMatchSnapshot();
});