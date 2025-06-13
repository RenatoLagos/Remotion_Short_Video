import React, { useMemo } from 'react';
import { OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SubtitleVariants } from './components/SubtitleVariants';
import { parseSRT, getCurrentSubtitle } from './utils/srtParser';

interface VideoWithStyledSubtitlesProps {
  variant?: 'glassmorphism' | 'shadow';
}

export const VideoWithStyledSubtitles: React.FC<VideoWithStyledSubtitlesProps> = ({
  variant = 'glassmorphism'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Convertir frame actual a tiempo en segundos
  const currentTime = frame / fps;

  // Parsear subtítulos
  const subtitles = useMemo(() => {
    const srtContent = `1
00:00:00,000 --> 00:00:07,000
¿Ever been cag in the awkward moment when
you're just going to ask for the bill in S

2
00:00:08,000 --> 00:00:11,000
Don't sweat it, I got your back.

3
00:00:13,000 --> 00:00:15,900
Getting the bill in Spanish is super easy.

4
00:00:16,000 --> 00:00:19,900
Just say,la cuenta por favor,like a loca.

5
00:00:20,000 --> 00:00:21,900
Here's...

6
00:00:22,000 --> 00:00:24,000
¿Y va muy bien?`;
    
    return parseSRT(srtContent);
  }, []);

  // Obtener el subtítulo actual
  const currentSubtitle = getCurrentSubtitle(subtitles, currentTime);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Video de fondo */}
      <OffthreadVideo 
        src={staticFile("video.mp4")} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      
      {/* Subtítulos con estilo personalizado */}
      {currentSubtitle && (
        <SubtitleVariants
          text={currentSubtitle}
          variant={variant}
        />
      )}
    </div>
  );
}; 