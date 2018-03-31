import { keyframes } from 'styled-components';

export const shimmerEffect = keyframes`
  0% { background-position: 100% 0%; }
  100% { background-position: -100% 0%; }
`;

export const spin = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export const rotate = keyframes`
  100% { transform: rotate(360deg); }
`;
