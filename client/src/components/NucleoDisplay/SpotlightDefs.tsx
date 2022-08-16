import { memo } from 'react';
import { NucleoSquare, SquareSize } from '@/types';

// This components sets up the spotlight gradients and masks
// It should only render once

interface Props {
   squares: Array<NucleoSquare>;
   squareSize: SquareSize;
}

const SpotlightDefs = ({ squares, squareSize }: Props) => {
   if (!squares || !squareSize) return undefined;

   // set up mask for red glow effect of stable elements
   const stableSquares = squares.map((square, ind) => {
      if (!square.props.stable) return undefined;

      const xloc = square.col * squareSize.square;
      const yloc = square.row * squareSize.square;
      const key = ind; // does not change

      return (
         <rect
            key={key}
            x={xloc}
            y={yloc}
            width={squareSize.square}
            height={squareSize.square}
            fill="white"
         />
      );
   });

   return (
      <defs>
         <radialGradient id="redSpotlight">
            <stop offset="10%" stopColor="rgba(150, 0, 0, 0.5)" />
            <stop offset="70%" stopColor="rgba(100, 0, 0, 0.1)" />
            <stop offset="100%" stopColor="rgba(100, 0, 0, 0.0)" />
         </radialGradient>

         <radialGradient id="whiteSpotlight">
            <stop offset="10%" stopColor="rgba(100, 100, 100, 0.5)" />
            <stop offset="70%" stopColor="rgba(100, 100, 100, 0.1)" />
            <stop offset="100%" stopColor="rgba(100, 100, 100, 0.0)" />
         </radialGradient>

         <mask id="redMask">{stableSquares}</mask>

         <mask id="whiteMask">
            {/* invert previous mask: create a white area, then overlay a masked black area */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
               x="0"
               y="0"
               width="100%"
               height="100%"
               fill="black"
               mask="url(#redMask)"
            />
         </mask>
      </defs>
   );
};

// TODO : fix typing issue
export default memo(SpotlightDefs as any);
