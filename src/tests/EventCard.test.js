import React from 'react';
import EventCard from '../components/EventCard';
import { configure, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const event = {
    slug: 'slug',
    image: 'image.jpg',
    member_profile_image: 'profile.jpg',
    title: 'Title',
    start_datetime: '00223232',
    location: 'Somewhere',
    tags: { map: () => { } },
    floatingTag: 'Floating Tag',
  }

  const component = shallow(
    <Router>
      <EventCard event={event} />
    </Router>
  );
  expect(component).toMatchSnapshot();
});