import React from 'react';
import { FontFamily } from '../config/fonts';

interface SubtitlesHighlightProps {
  text: string;
  position?: 'bottom' | 'top' | 'center';
  fontSize?: number;
  fontFamily?: FontFamily;
}

export const SubtitlesHighlight: React.FC<SubtitlesHighlightProps> = ({
  text,
  position = 'bottom',
  fontSize = 60,
  fontFamily = 'Figtree'
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

  const getFontFamily = (font: FontFamily): string => {
    const fontMap = {
      'Figtree': "'Figtree', 'Montserrat', system-ui, -apple-system, sans-serif",
      'Poppins': "'Poppins', 'Montserrat', system-ui, -apple-system, sans-serif", 
      'Nunito': "'Nunito', 'Montserrat', system-ui, -apple-system, sans-serif"
    };
    return fontMap[font];
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
          fontFamily: getFontFamily(fontFamily),
          fontWeight: 900,
          color: 'white',
          fontSize: `${fontSize}px`,
          textAlign: 'center',
          margin: 0,
          WebkitTextStroke: '22px black',
          paintOrder: 'stroke fill',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          letterSpacing: '1px',
          lineHeight: '1.2',
          padding: '10px 20px',
        }}
      >
        {text}
      </p>
    </div>
  );
}; 