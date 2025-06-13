import "./index.css";
import { Composition } from "remotion";
import { VideoVertical9x16Center } from "./VideoVertical9x16Center";
import { VideoVertical9x16Bottom } from "./VideoVertical9x16Bottom";
import { VideoVertical9x16Circle } from "./VideoVertical9x16Circle";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Componente 1: Video 9:16 completo con subtítulos al centro */}
      <Composition
        id="VideoCenter"
        component={VideoVertical9x16Center}
        durationInFrames={690} // 23 segundos a 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Componente 2: Video en mitad inferior con subtítulos abajo del centro */}
      <Composition
        id="VideoBottom"
        component={VideoVertical9x16Bottom}
        durationInFrames={690} // 23 segundos a 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Componente 3: Video en círculo superior izquierda con subtítulos al medio */}
      <Composition
        id="VideoCircle"
        component={VideoVertical9x16Circle}
        durationInFrames={690} // 23 segundos a 30fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};


