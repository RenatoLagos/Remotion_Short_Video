import { OpenAI } from 'openai';
import { openAiWhisperApiToCaptions } from '@remotion/openai-whisper';
import fs from 'fs';

// Tipo Caption según la documentación de Remotion
type Caption = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

// Configurar OpenAI (necesitarás tu API key)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de configurar tu API key
});

/**
 * Función para transcribir audio usando OpenAI Whisper y convertir a captions
 * @param audioFilePath - Ruta al archivo de audio
 * @param prompt - Prompt opcional para mejorar la transcripción
 * @returns Array de Caption objects con texto, tiempos y confianza
 */
export async function transcribeAudioToCaptions(
  audioFilePath: string,
  prompt?: string
) {
  try {
    // Llamar a la API de OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: 'whisper-1',
      response_format: 'verbose_json', // Importante: usar verbose_json
      prompt: prompt || 'Hola, este es un video en español...', // Prompt opcional
      timestamp_granularities: ['word'], // Obtener timestamps por palabra
    });

    // Convertir la respuesta de OpenAI a formato Caption de Remotion
    const { captions } = openAiWhisperApiToCaptions({ transcription });

    console.log(`✅ Transcripción completada: ${captions.length} captions generados`);
    
    return captions;
  } catch (error) {
    console.error('❌ Error en la transcripción:', error);
    throw error;
  }
}

/**
 * Función para exportar captions a formato SRT
 * @param captions - Array de Caption objects
 * @returns String en formato SRT
 */
export function captionsToSRT(captions: Caption[]) {
  return captions
    .map((caption, index) => {
      const startTime = msToSRTTime(caption.startMs);
      const endTime = msToSRTTime(caption.endMs);
      
      return `${index + 1}\n${startTime} --> ${endTime}\n${caption.text}\n`;
    })
    .join('\n');
}

/**
 * Convierte milisegundos a formato de tiempo SRT (HH:MM:SS,mmm)
 */
function msToSRTTime(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds
    .toString()
    .padStart(3, '0')}`;
}

/**
 * Función de ejemplo para mostrar cómo usar las captions
 */
export function logCaptionsExample(captions: Caption[]) {
  console.log('📝 Ejemplo de captions generados:');
  captions.slice(0, 5).forEach((caption, index) => {
    console.log(`${index + 1}. "${caption.text}" (${caption.startMs}ms - ${caption.endMs}ms) [Confianza: ${caption.confidence}]`);
  });
} 