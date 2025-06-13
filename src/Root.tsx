import "./index.css";
import { Composition } from "remotion";
import { MiVideoComponent } from "./MiVideoComponent";
import { VideoWithSubtitles } from "./VideoWithSubtitles";
import { VideoWithStyledSubtitles } from "./VideoWithStyledSubtitles";
import { VideoVerticalWithSubtitles } from "./VideoVerticalWithSubtitles";
import { VideoVerticalBottomHalf } from "./VideoVerticalBottomHalf";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Nueva composición para tu video personalizado */}
      <Composition
        id="MiVideo"
        component={MiVideoComponent}
        durationInFrames={300} // Ajusta según la duración de tu video
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Composición con video y subtítulos */}
      <Composition
        id="VideoConSubtitulos"
        component={VideoWithSubtitles}
        durationInFrames={720} // 24 segundos a 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          subtitleStyle: 'modern' as const,
          subtitlePosition: 'bottom' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          textColor: '#ffffff',
          fontSize: 48
                 }}
       />

       {/* Composiciones con diferentes estilos de subtítulos */}
       <Composition
         id="VideoGlassmorphism"
         component={VideoWithStyledSubtitles}
         durationInFrames={720}
         fps={30}
         width={1920}
         height={1080}
         defaultProps={{
           variant: 'glassmorphism' as const
         }}
       />

       <Composition
         id="VideoShadow"
         component={VideoWithStyledSubtitles}
         durationInFrames={720}
         fps={30}
         width={1920}
         height={1080}
         defaultProps={{
           variant: 'shadow' as const
         }}
       />

       {/* Composiciones para formato vertical 9:16 (Redes Sociales) */}
       <Composition
         id="ShortBasico"
         component={VideoVerticalWithSubtitles}
         durationInFrames={720}
         fps={30}
         width={1080}
         height={1920}
         defaultProps={{
           variant: 'basic' as const,
           subtitleStyle: 'modern' as const,
           backgroundColor: 'rgba(0, 0, 0, 0.8)',
           textColor: '#ffffff',
           fontSize: 56
         }}
       />

       <Composition
         id="ShortGlassmorphism"
         component={VideoVerticalWithSubtitles}
         durationInFrames={720}
         fps={30}
         width={1080}
         height={1920}
         defaultProps={{
           variant: 'glassmorphism' as const
         }}
       />

       <Composition
         id="ShortShadow"
         component={VideoVerticalWithSubtitles}
         durationInFrames={720}
         fps={30}
         width={1080}
         height={1920}
         defaultProps={{
           variant: 'shadow' as const
         }}
       />

       <Composition
         id="ShortBottomHalf"
         component={VideoVerticalBottomHalf}
         durationInFrames={720}
         fps={30}
         width={1080}
         height={1920}
         defaultProps={{
           subtitleStyle: 'modern' as const,
           backgroundColor: 'rgba(0, 0, 0, 0.8)',
           textColor: '#ffffff',
           fontSize: 56,
           topBackgroundColor: '#000000'
         }}
       />
    </>
  );
};


