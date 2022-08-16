import { useState, useEffect } from 'react';
import { SquareSize, NucleoSquare } from '@/types';
import getNewSquares from './getNewSquares';
import { nucleoChart } from './nucleoChart';

const useSquares = () => {
   const [squares, setSquares] = useState<Array<NucleoSquare> | null>(null);
   const [squareSize, setSquareSize] = useState<SquareSize | null>(null);

   // convert the display chart to a 1D array of objects
   //    containing location and isotope info
   // chart will only include on-screen elements to save
   //    render time
   useEffect(() => {
      if (!squareSize) return;
      const maxRow = window.innerHeight / squareSize.square + 1;
      const maxCol = window.innerWidth / squareSize.square;

      const newSquares = getNewSquares(nucleoChart, maxRow, maxCol);
      setSquares(newSquares);
   }, [squareSize, window.innerWidth, window.innerHeight]);

   // configure element square sizing based on window width
   useEffect(() => {
      let newSquareSize: SquareSize;
      if (window.innerWidth < 461) {
         newSquareSize = {
            square: 54,
            gap: 4,
            border: 2,
            mainText: '18px',
            subText: '10px',
            subMargin: 1,
         };
      } else if (window.innerWidth < 1921) {
         newSquareSize = {
            square: 66,
            gap: 6,
            border: 2,
            mainText: '24px',
            subText: '12px',
            subMargin: 2,
         };
      } else {
         newSquareSize = {
            square: 85,
            gap: 6,
            border: 3,
            mainText: '32px',
            subText: '16px',
            subMargin: 4,
         };
      }
      if (!squareSize || squareSize.square !== newSquareSize.square)
         setSquareSize(newSquareSize);
   }, [window.innerWidth, window.innerHeight]);

   return { squares, squareSize };
};

export default useSquares;
