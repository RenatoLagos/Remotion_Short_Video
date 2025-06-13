import ffmpeg from 'ffmpeg-static';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * Extrae el audio de un archivo de video usando ffmpeg
 * @param videoPath - Ruta al archivo de video
 * @param outputPath - Ruta donde guardar el audio extraído (opcional)
 * @returns Promise con la ruta del archivo de audio generado
 */
export async function extractAudioFromVideo(
  videoPath: string,
  outputPath?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Generar nombre de archivo de salida si no se proporciona
    const videoName = path.basename(videoPath, path.extname(videoPath));
    const audioPath = outputPath || `public/audio/${videoName}.mp3`;
    
    // Crear directorio si no existe
    const audioDir = path.dirname(audioPath);
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    console.log(`🎵 Extrayendo audio de: ${videoPath}`);
    console.log(`📁 Guardando en: ${audioPath}`);

    // Comando ffmpeg para extraer audio
    const ffmpegProcess = spawn(ffmpeg!, [
      '-i', videoPath,           // Archivo de entrada
      '-vn',                     // Sin video
      '-acodec', 'mp3',          // Codec de audio
      '-ab', '192k',             // Bitrate de audio
      '-ar', '44100',            // Sample rate
      '-y',                      // Sobrescribir archivo existente
      audioPath                  // Archivo de salida
    ]);

    let stderr = '';

    ffmpegProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    ffmpegProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Audio extraído exitosamente: ${audioPath}`);
        resolve(audioPath);
      } else {
        console.error('❌ Error al extraer audio:', stderr);
        reject(new Error(`FFmpeg falló con código ${code}: ${stderr}`));
      }
    });

    ffmpegProcess.on('error', (error) => {
      console.error('❌ Error al ejecutar ffmpeg:', error);
      reject(error);
    });
  });
}

/**
 * Verifica si un archivo de video existe y es válido
 * @param videoPath - Ruta al archivo de video
 * @returns boolean
 */
export function validateVideoFile(videoPath: string): boolean {
  if (!fs.existsSync(videoPath)) {
    console.error(`❌ Archivo no encontrado: ${videoPath}`);
    return false;
  }

  const validExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv'];
  const extension = path.extname(videoPath).toLowerCase();
  
  if (!validExtensions.includes(extension)) {
    console.error(`❌ Formato de video no soportado: ${extension}`);
    console.log(`✅ Formatos soportados: ${validExtensions.join(', ')}`);
    return false;
  }

  return true;
}

/**
 * Obtiene información básica del archivo de video
 * @param videoPath - Ruta al archivo de video
 * @returns Información del archivo
 */
export function getVideoInfo(videoPath: string) {
  const stats = fs.statSync(videoPath);
  const extension = path.extname(videoPath);
  const name = path.basename(videoPath, extension);
  
  return {
    name,
    extension,
    size: stats.size,
    sizeFormatted: formatBytes(stats.size),
    path: videoPath
  };
}

/**
 * Formatea bytes a una representación legible
 */
function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
} 