import { NucleoElement, NucleoSquare } from '@/types';

const getNewSquares = (
   chart: Array<NucleoElement>,
   maxRow: number,
   maxCol: number
): Array<NucleoSquare> => {
   let newSquares: Array<NucleoSquare> = [];

   chart.forEach((row: NucleoElement, rowInd: number) => {
      if (chart.length - rowInd > maxRow) return;
      const shiftedInd = chart.length - rowInd;
      const yloc = shiftedInd - 1; // proton count
      row.isotopes.forEach((col: number, colInd: number) => {
         if (colInd > maxCol) return;
         const xloc = col - shiftedInd + 1; // neutron count
         if (row.exclude && row.exclude.includes(col)) return;
         newSquares = newSquares.concat({
            row: yloc,
            col: xloc,
            props: {
               element: row.element,
               isotope: col,
               proton: yloc,
               stable: row.stable && row.stable.includes(col),
            },
         });
      });
   });

   return newSquares;
};

export default getNewSquares;
