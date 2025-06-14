import React from 'react';

interface SubtitlesHighlightProps {
  text: string;
  position?: 'bottom' | 'top' | 'center';
  fontSize?: number;
}

export const SubtitlesHighlight: React.FC<SubtitlesHighlightProps> = ({
  text,
  position = 'bottom',
  fontSize = 56
}) => {
  if (!text) return null;

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return { top: '5%', transform: 'translateX(-50%)' };
      case 'center':
        return { top: '50%', transform: 'translate(-50%, -50%)' };
      case 'bottom':
      default:
        return { bottom: '8%', transform: 'translateX(-50%)' };
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        ...getPositionStyles(),
        maxWidth: '90%',
        textAlign: 'center',
        transform: getPositionStyles().transform,
        zIndex: 10,
      }}
    >
      <p
        style={{
          // Estilo meme con contorno negro súper grueso
          fontFamily: "'Montserrat', 'Poppins', system-ui, -apple-system, sans-serif",
          fontWeight: 900, // ExtraBold
          color: 'white',
          fontSize: `${fontSize}px`,
          textAlign: 'center',
          margin: 0,
          WebkitTextStroke: '1px black',
          letterSpacing: '1px',
          lineHeight: '1.2',
          padding: '10px 20px',
          filter: 'drop-shadow(2px 2px 0px black) drop-shadow(-2px -2px 0px black) drop-shadow(2px -2px 0px black) drop-shadow(-2px 2px 0px black)',
        }}
      >
        {text}
      </p>
    </div>
  );
}; 