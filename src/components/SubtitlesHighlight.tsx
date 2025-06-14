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
        return { top: '8%', transform: 'translateX(-50%)' };
      case 'center':
        return { top: '50%', transform: 'translate(-50%, -50%)' };
      case 'bottom':
      default:
        return { bottom: '12%', transform: 'translateX(-50%)' };
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
          // Estilo meme con contorno negro grueso
          fontFamily: "'Montserrat', 'Poppins', system-ui, -apple-system, sans-serif",
          fontWeight: 800, // ExtraBold
          color: 'white',
          fontSize: `${fontSize}px`,
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.2,
          
          // Borde negro más grueso
          WebkitTextStroke: '4px black', // Aumentado de 2px a 4px
          textShadow: `
            -4px -4px 0 black,
            4px -4px 0 black,
            -4px 4px 0 black,
            4px 4px 0 black,
            -3px -3px 0 black,
            3px -3px 0 black,
            -3px 3px 0 black,
            3px 3px 0 black,
            -2px -2px 0 black,
            2px -2px 0 black,
            -2px 2px 0 black,
            2px 2px 0 black
          `, // Múltiples capas para contorno más grueso
        }}
      >
        {text}
      </p>
    </div>
  );
}; 