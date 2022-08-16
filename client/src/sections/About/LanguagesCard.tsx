import { SketchCard, SketchItem } from '@/components/elements';
import { LaTeX } from '@/assets/latex';

const LanguagesCard = () => (
   <SketchCard>
      <h1>Languages</h1>
      <SketchItem percent="90" itemDelay="0.05s">
         Javascript
      </SketchItem>
      <SketchItem percent="90" itemDelay="0.10s">
         HTML5 / CSS3 / SVG
      </SketchItem>
      <SketchItem percent="80" itemDelay="0.15s">
         Python
      </SketchItem>
      <SketchItem percent="80" itemDelay="0.20s">
         OpenGL / WebGL / GLSL
      </SketchItem>
      <SketchItem percent="75" itemDelay="0.25s">
         FORTRAN
      </SketchItem>
      <SketchItem percent="75" itemDelay="0.30s">
         Bash
      </SketchItem>
      <SketchItem percent="75" itemDelay="0.35s">
         <LaTeX />
         <span style={{ opacity: '0' }}>LaTeX</span>
      </SketchItem>
      <SketchItem percent="50" itemDelay="0.40s">
         C / C++
      </SketchItem>
      <SketchItem percent="50" itemDelay="0.45s">
         PHP
      </SketchItem>
      <SketchItem percent="45" itemDelay="0.45s">
         Typescript
      </SketchItem>
      <SketchItem percent="25" itemDelay="0.50s">
         Java
      </SketchItem>
   </SketchCard>
);

export default LanguagesCard;
