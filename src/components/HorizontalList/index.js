import React from 'react';

import { Container, MeetupCard } from './styles';

const HorizontalList = ({ meetups, loading, error }) => (
  <Container>
    {error && <div>{error}</div>}
    {meetups.data.map(meetup => (
      <MeetupCard className="checkbox" key={meetup.title}>
        <img src={meetup.cover_url} alt="Capa do meetup" />
        <div id="title-card">
          <div id="title-text">
            <h4>{meetup.title}</h4>
            <small>
              {meetup.total_members === 1 ? '1 membro' : `${meetup.total_members} membros`}
            </small>
          </div>
          <button type="button">></button>
        </div>
      </MeetupCard>
    ))}
  </Container>
);

export default HorizontalList;
