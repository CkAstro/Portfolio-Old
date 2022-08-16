import { useMousePosition } from '@/contexts';
import { NucleoSquare, SquareSize, Mouse } from '@/types';
import SpotlightDefs from './SpotlightDefs';
import css from './NucleoDisplay.module.css';

// We illuminate the isotope borders by having transparent borders which
//    reveal this Spotlight component. Spotlight follows the mouse, and
//    will turn red behind stable elements.
//
// To change spotlight color, we simply use two spotlights (one white one red)
//    and create a square mask for each stable isotope. '#redMask' will block
//    all spotlight effect NOT in these squares, and '#whiteMask' is an inverted
//    version, so the white spotlight is blocked within.
//
// NOTE : '#redMask' and '#whiteMask' masks as well as '#redSpotlight'
//    and '#whiteSpotlight' radial gradients used here are defined in
//    the 'SpotlightDefs' component
//
// NOTE : scale(1, -1) used here  in order to fix display to bottom of
//    section rather than top
//     - this requires inverting mouse y position from
//       mousePosition.y - top                    to
//       top - mousePosition.y + height

interface Props {
   squares: Array<NucleoSquare>;
   squareSize: SquareSize;
   divRef: any;
}

const Spotlight = ({ squares, squareSize, divRef }: Props) => {
   const { mousePosition } = useMousePosition() as Mouse;
   if (!squares || !squareSize || !divRef.current) return <div />;

   const rect = divRef.current.getBoundingClientRect();
   const { top, height } = rect;
   const buffer = top + height;

   // 'nucleo__spotlight' container is necessary so the un-highlighted background
   //    matches the element containers (and presumably renders faster than drawing
   //    an additional 100% rect here each frame)
   //    - without it, the border will 'appear' rather than 'glow'
   return (
      <div className={css.nucleo__spotlight}>
         <svg width="100%" height="100%" transform="scale(1, -1)">
            <SpotlightDefs squares={squares} squareSize={squareSize} />

            <circle
               cx={`${mousePosition.x}px`}
               cy={`${buffer - mousePosition.y}px`}
               r="300"
               fill="url(#whiteSpotlight)"
               mask="url(#whiteMask)"
            />
            <circle
               cx={`${mousePosition.x}px`}
               cy={`${buffer - mousePosition.y}px`}
               r="300"
               fill="url(#redSpotlight)"
               mask="url(#redMask)"
            />
         </svg>
      </div>
   );
};

export default Spotlight;
