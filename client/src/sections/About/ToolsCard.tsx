import { SketchCard, SketchItem } from '@/components/elements';

const ToolsCard = () => (
   <SketchCard cardDelay="0.5s">
      <h1>
         Tools <span style={{ fontWeight: '100' }}>&</span> Software
      </h1>
      <SketchItem percent="95" itemDelay="0.05s">
         NumPy / SciPy
      </SketchItem>
      <SketchItem percent="90" itemDelay="0.10s">
         UNIX / Linux / Windows
      </SketchItem>
      <SketchItem percent="90" itemDelay="0.15s">
         Microsoft Office Suite
      </SketchItem>
      <SketchItem percent="80" itemDelay="0.20s">
         GiT
      </SketchItem>
      <SketchItem percent="75" itemDelay="0.25s">
         PANDAS
      </SketchItem>
      <SketchItem percent="75" itemDelay="0.30s">
         GIMP / Photoshop
      </SketchItem>
      <SketchItem percent="50" itemDelay="0.35s">
         Blender
      </SketchItem>
   </SketchCard>
);

export default ToolsCard;
