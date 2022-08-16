import { MousePosition } from '@/types';

export interface SquarePosition {
   row: number;
   col: number;
}

const getLocation = (
   mouse: MousePosition,
   div: any,
   size: number
): SquarePosition => {
   // test explicity for NaN using +'1' === 2; +'a' === NaN
   if (!mouse || Number.isNaN(+mouse.x) || Number.isNaN(+mouse.y))
      throw new Error('Mouse object not recognized.');
   if (!div) throw new Error('div object does not exist');
   if (!size || Number.isNaN(+size))
      throw new Error('size does not exist or is invalid.');
   const { top, left, height } = div.getBoundingClientRect();
   return {
      row: (top + height - mouse.y) / size,
      col: (mouse.x - left) / size,
   };
};

const updateLocation = (
   currentSquare: SquarePosition,
   mouse: MousePosition
): SquarePosition => {
   if (!currentSquare || !currentSquare.row || !currentSquare.col)
      throw new Error('currentSquare object not recognized.');
   if (!mouse || Number.isNaN(+mouse.x) || Number.isNaN(+mouse.y))
      throw new Error('Mouse object not recognized.');
   // reset if off screen
   if (mouse.x > window.innerWidth || mouse.y < 0)
      return {
         row: 1.25,
         col: Math.random() * 3 + 0.5,
      };

   // move either up or right, with slight bias up
   const direction = Math.random() < 0.55;
   return {
      row: currentSquare.row + (direction ? 0.25 : 0),
      col: currentSquare.col + (direction ? 0 : 0.25),
   };
};

const updateMousePosition = (
   square: SquarePosition,
   div: any,
   size: number
): MousePosition => {
   if (!square || Number.isNaN(+square.row) || Number.isNaN(+square.col))
      throw new Error('square object not recognized.');
   if (!div) throw new Error('div object does not exist');
   if (!size || Number.isNaN(+size))
      throw new Error('size does not exist or is invalid.');
   const { top, left, height } = div.getBoundingClientRect();

   // mouse y axis is down while rows are up in this context
   return {
      x: left + square.col * size,
      y: top + height - square.row * size,
      isActive: false,
   };
};

export { getLocation, updateLocation, updateMousePosition };
