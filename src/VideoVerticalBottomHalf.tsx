import React, { useMemo } from 'react';
import { OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SubtitlesBottomHalf } from './components/SubtitlesBottomHalf';
import { parseSRT, getCurrentSubtitle } from './utils/srtParser';

interface VideoVerticalBottomHalfProps {
  subtitleStyle?: 'modern' | 'classic' | 'bold' | 'minimal';
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  topBackgroundColor?: string;
}

export const VideoVerticalBottomHalf: React.FC<VideoVerticalBottomHalfProps> = ({
  subtitleStyle = 'modern',
  backgroundColor = 'rgba(0, 0, 0, 0.8)',
  textColor = '#ffffff',
  fontSize = 56,
  topBackgroundColor = '#000000'
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
      {/* Mitad superior vacía con fondo personalizable */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: topBackgroundColor,
          zIndex: 1
        }}
      />
      
      {/* Mitad inferior con el video */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          zIndex: 2
        }}
      >
        <OffthreadVideo 
          src={staticFile("video.mp4")} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>
      
      {/* Subtítulos posicionados en la mitad inferior */}
      {currentSubtitle && (
        <SubtitlesBottomHalf
          text={currentSubtitle}
          style={subtitleStyle}
          backgroundColor={backgroundColor}
          textColor={textColor}
          fontSize={fontSize}
        />
      )}
    </div>
  );
}; 