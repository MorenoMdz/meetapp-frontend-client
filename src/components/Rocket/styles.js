import styled from 'styled-components';

export const RocketContainer = styled.div`
  width: 350px;
  #js-rocket {
    display: flex;
    margin: 4rem;
  }

  #js-rocket svg {
    margin: auto;
  }

  #particles ellipse {
    will-change: transform;
    animation: vibrate 0.3s infinite;
  }

  #js-rocket #flame {
    will-change: transform;
    animation: flicker 0.1s infinite;
  }

  #js-rocket #speed rect {
    will-change: transform;
  }

  #js-rocket #speed rect:first-of-type {
    animation: translateSpeed 9s infinite;
    animation-delay: 2s;
  }

  #js-rocket #speed rect:nth-child(2) {
    animation: translateSpeed infinite;
    animation-duration: 9s;
  }

  #js-rocket #speed rect:nth-child(3) {
    animation: translateSpeed infinite;
    animation-delay: 3s;
    animation-duration: 9s;
  }

  #js-rocket #speed rect:nth-child(4) {
    animation: translateSpeed infinite;
    animation-delay: 5s;
    animation-duration: 7s;
  }

  #js-rocket #speed rect:nth-child(5) {
    animation: translateSpeed infinite;
    animation-delay: 2s;
    animation-duration: 6s;
  }

  @keyframes vibrate {
    0% {
      transform: translateX(-0.4%);
    }

    50% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(-0.4%);
    }
  }

  @keyframes flicker {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }

  @keyframes translateSpeed {
    0% {
      transform: translateY(-100%);
      opacity: 1;
    }

    100% {
      transform: translateY(200%);
      opacity: 0;
    }
  }
`;
