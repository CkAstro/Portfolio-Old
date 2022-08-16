import { useRef } from 'react';
import { useSquares, useMeander } from '@/hooks';
import { Squares } from '@/types';
import ElementArray from './ElementArray';
import NucleoInfo from './NucleoInfo';
import Spotlight from './Spotlight';
import Overlay from './Overlay';
import css from './NucleoDisplay.module.css';

// The glowing border effect on this display is done by placing a 'spotlight'
//    on the lowest layer; a circular glow effect which follows the mouse
//    The 'grid' and elements are then drawn on top of the spotlight with a 2px
//    gap in between. This gap allows the spotlight to come through and acts as
//    the interactive border
//
// The effect relies heavily on useMousePosition context even though it is not used
//    in the main component - this allows us to easily use the spotlight along with
//    the hover effect and also makes implementing a planned idle effect much easier
//
// NOTE : The element blocks are drawn as SVGs to fix a zoom issue in Firefox
//    it also seems to be a slight performance boost
//
// NOTE : for now we prop drill squareSize/rect rather than use a context
//    so we can save on rerenders

const NucleoDisplay = () => {
   const { squares, squareSize } = useSquares() as Squares;
   const divRef = useRef(null);
   useMeander(divRef, squareSize);

   return (
      <div ref={divRef} className={css.nucleo}>
         <div className={css.nucleo__container}>
            <Spotlight
               squares={squares}
               squareSize={squareSize}
               divRef={divRef}
            />
         </div>
         <div className={css.nucleo__container}>
            <Overlay squares={squares} squareSize={squareSize} />
         </div>
         <div className={css.nucleo__container}>
            <ElementArray
               squares={squares}
               squareSize={squareSize}
               divRef={divRef}
            />
         </div>
         <NucleoInfo />
      </div>
   );
};

export default NucleoDisplay;
