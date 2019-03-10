import React from 'react';
import EventHeader from '../components/EventHeader';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const event = {
    image: '',
    content: '',
    start_datetime: '',
    end_datetime: '',
    tags: { map: () => { } },
    title: '',
    location: '',
  }

  const component = shallow(
    <EventHeader event={event} />
  );
  expect(component).toMatchSnapshot();
});