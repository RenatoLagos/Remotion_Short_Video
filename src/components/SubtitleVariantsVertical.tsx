import React from 'react';

interface SubtitleVariantsVerticalProps {
  text: string;
  variant: 'glassmorphism' | 'shadow';
}

export const SubtitleVariantsVertical: React.FC<SubtitleVariantsVerticalProps> = ({
  text,
  variant
}) => {
  if (!text) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'glassmorphism':
        return {
          container: {
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '24px 32px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          },
          text: {
            color: '#ffffff',
            fontWeight: 700,
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
            fontSize: '58px',
          }
        };

      case 'shadow':
        return {
          container: {
            background: 'transparent',
            padding: '20px 32px',
          },
          text: {
            color: '#ffffff',
            fontWeight: 900,
            textShadow: `
              4px 4px 0px #000000,
              -4px -4px 0px #000000,
              4px -4px 0px #000000,
              -4px 4px 0px #000000,
              8px 8px 12px rgba(0, 0, 0, 0.8)
            `,
            fontSize: '60px',
          }
        };

      default:
        return {
          container: {
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '16px',
            padding: '20px 32px',
          },
          text: {
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '56px',
          }
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '95%',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <div style={styles.container}>
        <p
          style={{
            ...styles.text,
            margin: 0,
            lineHeight: 1.2,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}; 