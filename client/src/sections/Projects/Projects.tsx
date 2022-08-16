import { useRef, memo } from 'react';
import { useIsVisible } from '@/hooks';
import { Cluster } from '@/components/containers';
import { Reversi } from './Reversi';
import { DataVis } from './DataVis';
import { NeuralNet } from './NeuralNet';
import { Emission } from './Emission';
import { CSM } from './CSM';
import { Instability } from './Instability';
import css from './Projects.module.css';

const FullStackHeader = () => {
   const divRef = useRef(null);
   const isVisible = useIsVisible(divRef, true);

   return (
      <div
         ref={divRef}
         className={`${css.headerContainer} ${isVisible ? css.active : null}`}
      >
         <h1 className={css.style1}>
            Select <span style={{ fontWeight: '700' }}>full stack</span>{' '}
            projects
         </h1>
      </div>
   );
};

const InteractiveHeader = () => {
   const divRef = useRef(null);
   const isVisible = useIsVisible(divRef, true);

   return (
      <div
         ref={divRef}
         className={`${css.headerContainer} ${isVisible ? css.active : null}`}
      >
         <h1 className={css.style2}>
            <span style={{ fontWeight: '700' }}>Interactive</span> figures
         </h1>
      </div>
   );
};

export const Projects = memo(() => (
   <>
      <FullStackHeader />
      <Reversi />
      <DataVis />
      <NeuralNet />

      <InteractiveHeader />
      <Cluster>
         <Instability />
         <CSM />
         <Emission />
      </Cluster>
   </>
));
