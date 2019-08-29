import React from 'react';
import { Line } from 'rc-progress';

import { Container } from './styles';

export default function ProgressBar({ total, max }) {
  
  const percent = parseInt((max/total)*100);

  return (
    <Container>
      <span className="percent">{percent}%</span>
      <Line percent={percent} trailWidth="1.5" strokeWidth="1.5" strokeColor="green" className="progress" />
    </Container>
  );
}
