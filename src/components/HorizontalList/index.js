import React from 'react';

import { Container, MeetupCard } from './styles';

const HorizontalList = ({ meetups, loading, error }) => (
  <Container>
    {error && <div>TODO error</div>}
    {meetups.map(meetup => (
      <MeetupCard className="checkbox" key={meetup.title}>
        <img src={meetup.cover} alt="Meetup cover" />
        <div id="title-card">
          <div id="title-text">
            <h4>{meetup.title}</h4>
            <small>120 membros</small>
          </div>
          <button type="button">></button>
        </div>
      </MeetupCard>
    ))}
  </Container>
);

export default HorizontalList;
