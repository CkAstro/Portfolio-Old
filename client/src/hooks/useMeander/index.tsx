import { useState, useEffect, useRef } from 'react';
import { useMousePosition } from '@/contexts';
import { SquareSize, MousePosition } from '@/types';
import { getLocation, updateLocation, updateMousePosition } from './logic';

// meander effect for NucleoDisplay component
//
// on page load, it waits 1 second and begins moving
//    'MousePosition' context in a passive manner
// any actual mouse movement will kill the effect and
//    start a 4 second timer before meander restarts
// this is handled by mousePosition.isActive where
//    a 'true' value is set when user has interacted,
//    a 'false' value is set when meander starts

const useMeander = (divRef: any, squareSize: SquareSize) => {
   const [isIdle, setIsIdle] = useState(false);
   const { mousePosition, setMousePosition } = useMousePosition();

   const idleRef = useRef<any>(isIdle);
   const mouseRef = useRef<MousePosition>(mousePosition);
   const meanderRef = useRef<any>(null);

   // wander in a semi-random direction
   const meander = () => {
      const squareLoc = getLocation(
         mouseRef.current,
         divRef.current,
         squareSize.square
      );
      const newSquare = updateLocation(squareLoc, mouseRef.current);
      const newMousePosition = updateMousePosition(
         newSquare,
         divRef.current,
         squareSize.square
      );
      setMousePosition(newMousePosition);
      meanderRef.current = setTimeout(() => meander(), 500);
   };

   // call meander loop when idle state is set
   useEffect(() => {
      if (isIdle) meander();
   }, [isIdle]);

   // reset everything if user interacts with viewport
   useEffect(() => {
      if (!mousePosition.isActive) return;
      setIsIdle(false);
      clearTimeout(idleRef.current);
      clearTimeout(meanderRef.current);
      idleRef.current = setTimeout(() => setIsIdle(true), 4000);
   }, [mousePosition.isActive]);

   // update our reference for meander()
   useEffect(() => {
      mouseRef.current = { ...mousePosition };
   }, [mousePosition]);

   // on init, start short idle timer
   useEffect(() => {
      idleRef.current = setTimeout(() => setIsIdle(true), 1000);
   }, []);
};

export default useMeander;
