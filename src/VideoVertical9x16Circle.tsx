import React, { useMemo } from 'react';
import { OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SubtitlesHighlight } from './components/SubtitlesHighlight';
import { parseSRT, getCurrentSubtitle } from './utils/srtParser';

export const VideoVertical9x16Circle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const currentTime = frame / fps;

  const subtitles = useMemo(() => {
    const srtContent = `1
00:00:00,000 --> 00:00:02,900
Ever been caught in that awkward moment when

2
00:00:03,160 --> 00:00:06,720
you're just going to ask for the bill in Spanish

3
00:00:06,800 --> 00:00:08,180
but your brain goes blank?

4
00:00:08,820 --> 00:00:11,360
Don't sweat it, I got your back.

5
00:00:13,720 --> 00:00:16,180
Getting the bill in Spanish is super easy.

6
00:00:17,320 --> 00:00:18,820
Just say, la cuenta por favor.

7
00:00:19,480 --> 00:00:20,060
Like a local.

8
00:00:21,120 --> 00:00:23,000
Here's...`;
    
    return parseSRT(srtContent);
  }, []);

  const currentSubtitle = getCurrentSubtitle(subtitles, currentTime);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#000000' }}>
      {/* Video en círculo - superior izquierda */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '4px solid #ffffff',
        zIndex: 10
      }}>
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
      
      {/* Subtítulos en el medio */}
      {currentSubtitle && (
        <SubtitlesHighlight
          text={currentSubtitle}
          highlightWords={['critical', 'important', 'easy', 'Spanish', 'bill', 'favor', 'local']}
          position="center"
          fontSize={56}
        />
      )}
    </div>
  );
}; 