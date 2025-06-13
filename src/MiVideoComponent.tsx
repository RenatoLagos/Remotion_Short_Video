import React from 'react';
import { OffthreadVideo, staticFile } from 'remotion';

// Componente para tu video sin efectos
export const MiVideoComponent: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <OffthreadVideo 
        src={staticFile("video.mp4")} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
}; 