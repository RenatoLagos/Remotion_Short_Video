import React from 'react';

interface SubtitlesBottomHalfProps {
  text: string;
  style?: 'modern' | 'classic' | 'bold' | 'minimal';
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
}

export const SubtitlesBottomHalf: React.FC<SubtitlesBottomHalfProps> = ({
  text,
  style = 'modern',
  backgroundColor = 'rgba(0, 0, 0, 0.8)',
  textColor = '#ffffff',
  fontSize = 56
}) => {
  if (!text) return null;

  const getStyleVariant = () => {
    switch (style) {
      case 'bold':
        return {
          fontWeight: 900,
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
          letterSpacing: '1px',
          textTransform: 'uppercase' as const,
        };
      case 'classic':
        return {
          fontWeight: 600,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          fontFamily: 'serif',
        };
      case 'minimal':
        return {
          fontWeight: 400,
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          fontFamily: 'sans-serif',
        };
      case 'modern':
      default:
        return {
          fontWeight: 700,
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        };
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '6%', // Posicionado en la parte inferior de la mitad inferior
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '95%',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundColor,
          padding: '20px 24px',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <p
          style={{
            color: textColor,
            fontSize: `${fontSize}px`,
            margin: 0,
            lineHeight: 1.3,
            ...getStyleVariant(),
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}; 