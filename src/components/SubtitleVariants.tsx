import React from 'react';

interface SubtitleVariantsProps {
  text: string;
  variant: 'glassmorphism' | 'shadow';
}

export const SubtitleVariants: React.FC<SubtitleVariantsProps> = ({
  text,
  variant
}) => {
  // Sin animaciones de entrada

  if (!text) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'glassmorphism':
        return {
          container: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '20px 40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          },
          text: {
            color: '#ffffff',
            fontWeight: 600,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontSize: '52px',
          }
        };

      case 'shadow':
        return {
          container: {
            background: 'transparent',
            padding: '16px 32px',
          },
          text: {
            color: '#ffffff',
            fontWeight: 900,
            textShadow: `
              3px 3px 0px #000000,
              -3px -3px 0px #000000,
              3px -3px 0px #000000,
              -3px 3px 0px #000000,
              6px 6px 10px rgba(0, 0, 0, 0.8)
            `,
            fontSize: '54px',
          }
        };

      default:
        return {
          container: {
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '12px',
            padding: '16px 32px',
          },
          text: {
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '48px',
          }
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '90%',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <div style={styles.container}>
        <p
          style={{
            ...styles.text,
            margin: 0,
            lineHeight: 1.4,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}; 