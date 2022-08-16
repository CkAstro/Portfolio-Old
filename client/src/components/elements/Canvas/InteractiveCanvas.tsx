/* eslint no-restricted-globals: ["warn", "location"] */
import { useState, useEffect, useRef } from 'react';

const useInteractiveCanvas = (
   ctxRef: any,
   draw: (ref: any, data: any) => void,
   data: any
) => {
   const canvasRef = useRef<any>(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      ctxRef.current = context;
   }, []);

   useEffect(() => {
      draw(ctxRef.current, data);
   }, [draw, data]);

   return canvasRef;
};

interface Mouse {
   x: number | null;
   y: number | null;
}

interface MouseInfo {
   click: Mouse | null;
   location: Mouse;
   prevLocation: Mouse | null;
   rect: any;
   deltaY: number | null;
   isActive: boolean;
}

interface Props {
   draw: (ref: any, data: any) => void;
   onInteract: (ref: any, mouseInfo: MouseInfo, data: any) => void;
   data: any;
   style: React.CSSProperties;
}

const InteractiveCanvas = ({ draw, onInteract, data, style }: Props) => {
   const [isActive, setIsActive] = useState<boolean>(false);
   const [mouseLocation, setMouseLocation] = useState<Mouse>({
      x: null,
      y: null,
   });
   const [clickLocation, setClickLocation] = useState<Mouse>({
      x: null,
      y: null,
   });

   const ctxRef = useRef<any>(null);
   const canvasRef = useInteractiveCanvas(ctxRef, draw, data);

   const handleMouseDown = (event: any, prevent: boolean = true) => {
      if (prevent) event.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const location = { x: event.clientX, y: event.clientY };
      const mouseInfo = {
         click: location,
         location,
         prevLocation: location,
         rect,
         deltaY: null,
         isActive: true,
      };
      onInteract(ctxRef.current, mouseInfo, data);
      setMouseLocation(location);
      setClickLocation(location);
      setIsActive(true);
   };

   const handleMouseUp = (event: any, prevent: boolean = true) => {
      if (prevent) event.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const location = { x: event.clientX, y: event.clientY };
      const mouseInfo = {
         click: null,
         location,
         prevLocation: location,
         rect,
         deltaY: null,
         isActive,
      };
      onInteract(ctxRef.current, mouseInfo, data);
      setIsActive(false);
   };

   const handleMouseMove = (event: any, prevent: boolean = true) => {
      if (prevent) event.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const location = { x: event.clientX, y: event.clientY };
      const mouseInfo = {
         click: clickLocation,
         location,
         prevLocation: mouseLocation,
         rect,
         deltaY: null,
         isActive,
      };
      onInteract(ctxRef.current, mouseInfo, data);
      setMouseLocation(location);
   };

   const handleMouseLeave = (event: any) => {
      event.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const location = { x: event.clientX, y: event.clientY };
      const mouseInfo = {
         click: null,
         location,
         prevLocation: location,
         rect,
         deltaY: null,
         isActive,
      };
      onInteract(ctxRef.current, mouseInfo, data);
      setIsActive(false);
   };

   const handleScroll = (event: any) => {
      event.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const location = { x: event.clientX, y: event.clientY };
      const mouseInfo = {
         click: clickLocation,
         location,
         prevLocation: mouseLocation,
         rect,
         deltaY: event.deltaY,
         isActive,
      };
      onInteract(ctxRef.current, mouseInfo, data);
   };

   const handleTouchStart = (event: any) => {
      handleMouseDown(event.nativeEvent.changedTouches[0], false);
   };

   const handleTouchEnd = (event: any) => {
      handleMouseUp(event.nativeEvent.changedTouches[0], false);
   };

   const handleTouchMove = (event: any) => {
      handleMouseMove(event.nativeEvent.changedTouches[0], false);
   };

   // this is necessary to get around 'passive' event listeners
   // see more here: https://github.com/facebook/react/issues/19651
   useEffect(() => {
      const canvas = canvasRef.current;
      canvas.addEventListener('wheel', handleScroll);
      canvas.addEventListener('touchstart', (e: any) => e.preventDefault());
      canvas.addEventListener('touchmove', (e: any) => e.preventDefault());
   }, []);

   return (
      <canvas
         ref={canvasRef}
         style={style}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         onWheel={handleScroll}
         onTouchStart={handleTouchStart}
         onTouchEnd={handleTouchEnd}
         onTouchMove={handleTouchMove}
      />
   );
};

export { InteractiveCanvas };
