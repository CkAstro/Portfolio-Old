import { SketchCard, SketchItem } from '@/components/elements';

const FrameworksCard = () => (
   <SketchCard cardDelay="0.25s">
      <h1>
         Frameworks <span style={{ fontWeight: '100' }}>&</span> APIs
      </h1>
      <SketchItem percent="90" itemDelay="0.05s">
         React
      </SketchItem>
      <SketchItem percent="90" itemDelay="0.10s">
         NodeJS / Express
      </SketchItem>
      <SketchItem percent="90" itemDelay="0.15s">
         RESTful
      </SketchItem>
      <SketchItem percent="90" itemDelay="0.20s">
         OpenMP / MPI
      </SketchItem>
      <SketchItem percent="50" itemDelay="0.25s">
         Redux
      </SketchItem>
      <SketchItem percent="50" itemDelay="0.30s">
         OpenACC
      </SketchItem>
   </SketchCard>
);

export default FrameworksCard;
