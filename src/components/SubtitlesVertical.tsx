import React from 'react';

interface SubtitlesVerticalProps {
  text: string;
  style?: 'modern' | 'classic' | 'bold' | 'minimal';
  position?: 'bottom' | 'top' | 'center';
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
}

export const SubtitlesVertical: React.FC<SubtitlesVerticalProps> = ({
  text,
  style = 'modern',
  position = 'bottom',
  backgroundColor = 'rgba(0, 0, 0, 0.8)',
  textColor = '#ffffff',
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
        left: '50%',
        ...getPositionStyles(),
        maxWidth: '95%',
        textAlign: 'center',
        transform: getPositionStyles().transform,
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