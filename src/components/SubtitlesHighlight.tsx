import React from 'react';

interface SubtitlesHighlightProps {
  text: string;
  highlightWords?: string[]; // Palabras que se destacarán en amarillo
  position?: 'bottom' | 'top' | 'center';
  fontSize?: number;
}

export const SubtitlesHighlight: React.FC<SubtitlesHighlightProps> = ({
  text,
  highlightWords = [],
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

  // Función para resaltar palabras específicas
  const renderHighlightedText = (text: string) => {
    if (highlightWords.length === 0) {
      return text;
    }
    
    // Crear un patrón regex para todas las palabras a destacar
    const pattern = new RegExp(`\\b(${highlightWords.join('|')})\\b`, 'gi');
    
    // Dividir el texto en partes
    const parts = text.split(pattern);
    
    return parts.map((part, index) => {
      const isHighlighted = highlightWords.some(word => 
        part.toLowerCase() === word.toLowerCase()
      );
      
      if (isHighlighted) {
        return (
          <span
            key={index}
            style={{
              backgroundColor: '#FFD700', // Amarillo dorado
              color: '#000000',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 900,
            }}
          >
            {part}
          </span>
        );
      }
      
      return part;
    });
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
      <div
        style={{
          backgroundColor: '#000000', // Fondo negro sólido
          padding: '16px 24px',
          borderRadius: '8px',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <p
          style={{
            color: '#ffffff',
            fontSize: `${fontSize}px`,
            margin: 0,
            lineHeight: 1.2,
            fontWeight: 700,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: 'none', // Sin sombra para un look más limpio
          }}
        >
          {renderHighlightedText(text)}
        </p>
      </div>
    </div>
  );
}; 