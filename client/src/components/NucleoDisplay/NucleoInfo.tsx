import React from 'react';
import { useSquares } from '@/hooks';
import { Squares } from '@/types';
import css from './NucleoDisplay.module.css';

const NucleoInfo = () => {
   const { squareSize } = useSquares() as Squares;

   const style = {
      '--squareSize': `${squareSize ? squareSize.square : 66}px`,
   } as React.CSSProperties;

   return (
      <div style={style} className={css.learnMore}>
         <a
            href="https://en.wikipedia.org/wiki/Table_of_nuclides"
            target="_blank"
            rel="noreferrer"
         >
            <div>nuclear isotopes</div>
            <div>&gt; learn more</div>
         </a>
      </div>
   );
};

export default NucleoInfo;
