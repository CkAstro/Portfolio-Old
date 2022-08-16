import { NucleoSquare, SquareSize, Mouse } from '@/types';
import { useMousePosition } from '@/contexts';
import Element from './Element';

// build the element display
// we calc mouseover here and pass a bool so that elements should
//    only ever be re-rendered on mouseover (and mouseleave)
//
// NOTE : scale(1, -1) used here and again in Element component
//    in order to fix display to bottom of section rather than top

interface Props {
   squares: Array<NucleoSquare>;
   squareSize: SquareSize;
   divRef: any;
}

const ElementArray = ({ squares, squareSize, divRef }: Props) => {
   const { mousePosition } = useMousePosition() as Mouse;
   if (!squares || !squareSize || !divRef.current) return <div />;

   const rect = divRef.current.getBoundingClientRect();
   const { left, top, height } = rect;
   const buffer = top + height;

   const targetRow = Math.floor((buffer - mousePosition.y) / squareSize.square);
   const targetCol = Math.floor((mousePosition.x - left) / squareSize.square);

   const arrayMap = squares.map((square, ind) => {
      const activeRow = targetRow === square.row;
      const activeCol = targetCol === square.col;
      const key = ind; // always same order
      return (
         <Element
            key={key}
            square={square}
            squareSize={squareSize}
            hasMouseOver={activeRow && activeCol}
         />
      );
   });

   return (
      <svg width="100%" height="100%" transform="scale(1, -1)">
         {arrayMap}
      </svg>
   );
};

export default ElementArray;
