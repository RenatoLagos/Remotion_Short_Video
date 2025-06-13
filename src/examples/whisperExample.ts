/**
 * Ejemplo de uso de OpenAI Whisper con Remotion
 * 
 * Este archivo muestra cómo usar la función transcribeAudioToCaptions
 * para generar subtítulos automáticamente desde un archivo de audio.
 */

import { transcribeAudioToCaptions, captionsToSRT, logCaptionsExample } from '../utils/whisperTranscription';

async function ejemploCompleto() {
  try {
    console.log('🎵 Iniciando transcripción con OpenAI Whisper...');
    
    // PASO 1: Transcribir audio a captions
    // Reemplaza 'path/to/your/audio.mp3' con la ruta real de tu archivo
    const captions = await transcribeAudioToCaptions(
      'public/audio/mi-audio.mp3', // Coloca tu archivo de audio en public/audio/
      'Este es un video tutorial sobre programación en español.' // Prompt opcional
    );

    // PASO 2: Mostrar ejemplo de captions generados
    logCaptionsExample(captions);

    // PASO 3: Exportar a formato SRT
    const srtContent = captionsToSRT(captions);
    console.log('\n📄 Contenido SRT generado:');
    console.log(srtContent.substring(0, 300) + '...');

    // PASO 4: Guardar archivo SRT (opcional)
    const fs = await import('fs');
    fs.writeFileSync('subtitulos-generados.srt', srtContent);
    console.log('✅ Archivo SRT guardado como: subtitulos-generados.srt');

    // PASO 5: Mostrar estructura de Caption para usar en Remotion
    console.log('\n🎬 Estructura de Caption para Remotion:');
    console.log('const captions: Caption[] = [');
    captions.slice(0, 3).forEach(caption => {
      console.log(`  {`);
      console.log(`    text: "${caption.text}",`);
      console.log(`    startMs: ${caption.startMs},`);
      console.log(`    endMs: ${caption.endMs},`);
      console.log(`    timestampMs: ${caption.timestampMs},`);
      console.log(`    confidence: ${caption.confidence}`);
      console.log(`  },`);
    });
    console.log('  // ... más captions');
    console.log('];');

    return captions;

  } catch (error) {
    console.error('❌ Error en el ejemplo:', error);
    
    if (error instanceof Error && error.message?.includes('OPENAI_API_KEY')) {
      console.log('\n💡 Solución:');
      console.log('1. Obtén tu API key en: https://platform.openai.com/api-keys');
      console.log('2. Crea un archivo .env en la raíz del proyecto');
      console.log('3. Agrega: OPENAI_API_KEY=tu_api_key_de_openai');
    }
    
    if (error instanceof Error && error.message?.includes('ENOENT')) {
      console.log('\n💡 Solución:');
      console.log('1. Coloca tu archivo de audio en la carpeta public/audio/');
      console.log('2. Formatos soportados: mp3, wav, m4a, etc.');
      console.log('3. Actualiza la ruta en el código');
    }
  }
}

// Función para generar captions de ejemplo (sin API)
export function generarCaptionsEjemplo() {
  return [
    {
      text: "Hola,",
      startMs: 0,
      endMs: 500,
      timestampMs: 250,
      confidence: 0.98
    },
    {
      text: "este",
      startMs: 500,
      endMs: 800,
      timestampMs: 650,
      confidence: 0.97
    },
    {
      text: "es",
      startMs: 800,
      endMs: 1000,
      timestampMs: 900,
      confidence: 0.99
    },
    {
      text: "un",
      startMs: 1000,
      endMs: 1200,
      timestampMs: 1100,
      confidence: 0.98
    },
    {
      text: "ejemplo",
      startMs: 1200,
      endMs: 1800,
      timestampMs: 1500,
      confidence: 0.96
    },
    {
      text: "de",
      startMs: 1800,
      endMs: 2000,
      timestampMs: 1900,
      confidence: 0.99
    },
    {
      text: "subtítulos",
      startMs: 2000,
      endMs: 2800,
      timestampMs: 2400,
      confidence: 0.95
    },
    {
      text: "automáticos.",
      startMs: 2800,
      endMs: 3500,
      timestampMs: 3150,
      confidence: 0.94
    }
  ];
}

// Ejecutar ejemplo si se llama directamente
if (typeof require !== 'undefined' && require.main === module) {
  ejemploCompleto();
}

export { ejemploCompleto }; 