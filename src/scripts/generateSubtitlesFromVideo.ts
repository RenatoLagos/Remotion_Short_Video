/**
 * Script completo para generar subtítulos desde un archivo de video
 * 
 * Uso:
 * 1. Coloca tu video.mp4 en la carpeta public/videos/
 * 2. Ejecuta: npx ts-node src/scripts/generateSubtitlesFromVideo.ts
 */

import { extractAudioFromVideo, validateVideoFile, getVideoInfo } from '../utils/videoToAudio';
import { transcribeAudioToCaptions, captionsToSRT, logCaptionsExample } from '../utils/whisperTranscription';
import fs from 'fs';
import path from 'path';

// Configuración
const VIDEO_PATH = 'public/videos/video.mp4'; // Cambia esta ruta por tu video
const OUTPUT_DIR = 'public/subtitles';

async function generateSubtitlesFromVideo() {
  try {
    console.log('🎬 Iniciando generación de subtítulos desde video...\n');

    // PASO 1: Validar archivo de video
    console.log('📋 PASO 1: Validando archivo de video...');
    if (!validateVideoFile(VIDEO_PATH)) {
      throw new Error('Archivo de video no válido');
    }

    const videoInfo = getVideoInfo(VIDEO_PATH);
    console.log(`✅ Video encontrado: ${videoInfo.name}${videoInfo.extension}`);
    console.log(`📊 Tamaño: ${videoInfo.sizeFormatted}\n`);

    // PASO 2: Extraer audio del video
    console.log('🎵 PASO 2: Extrayendo audio del video...');
    const audioPath = await extractAudioFromVideo(VIDEO_PATH);
    console.log(`✅ Audio extraído: ${audioPath}\n`);

    // PASO 3: Transcribir audio con OpenAI Whisper
    console.log('🤖 PASO 3: Transcribiendo audio con OpenAI Whisper...');
    const captions = await transcribeAudioToCaptions(
      audioPath,
      'Este es un video con contenido en español. Incluye diálogos y narración.' // Personaliza este prompt
    );
    console.log(`✅ Transcripción completada: ${captions.length} captions generados\n`);

    // PASO 4: Mostrar ejemplo de captions
    console.log('📝 PASO 4: Ejemplo de captions generados:');
    logCaptionsExample(captions);
    console.log('');

    // PASO 5: Crear directorio de salida
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // PASO 6: Exportar a diferentes formatos
    console.log('💾 PASO 5: Exportando subtítulos...');
    
    // Exportar a SRT
    const srtContent = captionsToSRT(captions);
    const srtPath = path.join(OUTPUT_DIR, `${videoInfo.name}.srt`);
    fs.writeFileSync(srtPath, srtContent, 'utf8');
    console.log(`✅ Archivo SRT guardado: ${srtPath}`);

    // Exportar a JSON (para usar en Remotion)
    const jsonPath = path.join(OUTPUT_DIR, `${videoInfo.name}_captions.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(captions, null, 2), 'utf8');
    console.log(`✅ Archivo JSON guardado: ${jsonPath}`);

    // Exportar a TypeScript (para importar directamente)
    const tsContent = generateTypescriptCaptions(captions, videoInfo.name);
    const tsPath = path.join(OUTPUT_DIR, `${videoInfo.name}_captions.ts`);
    fs.writeFileSync(tsPath, tsContent, 'utf8');
    console.log(`✅ Archivo TypeScript guardado: ${tsPath}`);

    // PASO 7: Generar estadísticas
    console.log('\n📊 ESTADÍSTICAS:');
    const totalDuration = Math.max(...captions.map(c => c.endMs));
    const totalWords = captions.length;
    const avgConfidence = captions.reduce((sum, c) => sum + (c.confidence || 0), 0) / totalWords;
    
    console.log(`⏱️  Duración total: ${Math.round(totalDuration / 1000)}s`);
    console.log(`📝 Total de palabras: ${totalWords}`);
    console.log(`🎯 Confianza promedio: ${Math.round(avgConfidence * 100)}%`);

    // PASO 8: Instrucciones para usar en Remotion
    console.log('\n🎬 CÓMO USAR EN REMOTION:');
    console.log('1. Importa los captions en tu componente:');
    console.log(`   import { captions } from '../public/subtitles/${videoInfo.name}_captions';`);
    console.log('2. Usa el componente VideoWithWhisperCaptions como ejemplo');
    console.log('3. O crea tu propio componente usando los captions generados');

    console.log('\n🎉 ¡Subtítulos generados exitosamente!');

  } catch (error) {
    console.error('\n❌ Error al generar subtítulos:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('OPENAI_API_KEY')) {
        console.log('\n💡 Solución:');
        console.log('1. Verifica que tu archivo .env contenga: OPENAI_API_KEY=tu_api_key');
        console.log('2. Reinicia el proceso después de configurar la API key');
      }
      
      if (error.message.includes('ENOENT') || error.message.includes('no válido')) {
        console.log('\n💡 Solución:');
        console.log('1. Coloca tu archivo video.mp4 en public/videos/');
        console.log('2. O actualiza la variable VIDEO_PATH con la ruta correcta');
        console.log('3. Formatos soportados: .mp4, .avi, .mov, .mkv, .webm');
      }
    }
  }
}

// Tipo Caption según la documentación de Remotion
type Caption = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

/**
 * Genera un archivo TypeScript con los captions para importar directamente
 */
function generateTypescriptCaptions(captions: Caption[], videoName: string): string {
  return `// Subtítulos generados automáticamente para ${videoName}
// Generado el: ${new Date().toLocaleString()}

export type Caption = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

export const captions: Caption[] = ${JSON.stringify(captions, null, 2)};

export default captions;
`;
}

// Ejecutar si se llama directamente
if (typeof require !== 'undefined' && require.main === module) {
  generateSubtitlesFromVideo();
}

export { generateSubtitlesFromVideo }; 