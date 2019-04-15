import React from 'react';

import { Container, MeetupCard, NavLink } from './styles';
import Spinner from '../Spinner';
import goIcon from '../../assets/play-button.svg';

const HorizontalList = ({ meetups, loading, error }) => (
  <Container>
    {error && <div>{error}</div>}
    {loading ? (
      <Spinner loading={loading} />
    ) : (
      meetups.data.map(meetup => (
        <MeetupCard className="checkbox" key={meetup.id}>
          <img src={meetup.cover_url} alt="Capa do meetup" />
          <div id="title-card">
            <div id="title-text">
              <h4>{meetup.title}</h4>
              <small>
                {meetup.total_members === 1 ? '1 membro' : `${meetup.total_members} membros`}
              </small>
            </div>
            <NavLink to={`meetup/${meetup.id}`}>
              <img src={goIcon} alt="Para o meetup" />
            </NavLink>
          </div>
        </MeetupCard>
      ))
    )}
  </Container>
);

export default HorizontalList;
