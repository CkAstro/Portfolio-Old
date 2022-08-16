import { useState, useEffect, useRef } from 'react';

const useGL2Canvas = (
   glRef: any,
   draw: (ref: any, args: any) => void,
   style: React.CSSProperties,
   args: any
) => {
   const canvasRef = useRef<any>(null);
   const renderRef = useRef<any>(null);

   const animate = () => {
      draw(glRef.current, args);
      renderRef.current = requestAnimationFrame(animate);
   };

   // init gl instance
   useEffect(() => {
      const canvas = canvasRef.current;
      const gl = canvas.getContext('webgl2');
      gl.getExtension('OES_texture_float_linear');

      canvas.width = (style.width as string).slice(0, -2);
      canvas.height = (style.height as string).slice(0, -2);
      gl.viewport(0, 0, canvas.width, canvas.height);
      glRef.current = gl;

      renderRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(renderRef.current);
   }, []);

   return canvasRef;
};

interface Mouse {
   x: number | null;
   y: number | null;
}

interface MouseInfo {
   clickLocation: Mouse;
   mouseLocation: Mouse;
   lastMouseLocation: Mouse | null;
   deltaY: number | null;
   isActive: boolean;
}

interface Props {
   draw: (ref: any, args: any) => void;
   onInteract: (ref: any, mouseInfo: MouseInfo) => void;
   style: React.CSSProperties;
   args: any;
}

const GL2Canvas = ({ draw, onInteract, style, ...args }: Props) => {
   const [isActive, setIsActive] = useState<boolean>(false);
   const [mouseLocation, setMouseLocation] = useState<Mouse>({
      x: null,
      y: null,
   });
   const [clickLocation, setClickLocation] = useState<Mouse>({
      x: null,
      y: null,
   });

   const glRef = useRef<any>(null);
   const canvasRef = useGL2Canvas(glRef, draw, style, args);

   const handleMouseDown = (event: any, prevent: boolean = true) => {
      if (prevent) event.preventDefault();
      const location = { x: event.clientX, y: event.clientY };
      const mouseInfo: MouseInfo = {
         clickLocation: location,
         mouseLocation: location,
         lastMouseLocation: prevent ? mouseLocation : null,
         deltaY: null,
         isActive: true,
      };

      onInteract(glRef.current, mouseInfo);
      setMouseLocation(location);
      setClickLocation(location);
      setIsActive(true);
   };

   const handleMouseUp = (event: any, prevent: boolean = true) => {
      if (prevent) event.preventDefault();
      setIsActive(false);
   };

   const handleMouseMove = (event: any, prevent: boolean = true) => {
      if (prevent) event.preventDefault();
      const location = { x: event.clientX, y: event.clientY };
      const mouseInfo = {
         clickLocation,
         mouseLocation: location,
         lastMouseLocation: mouseLocation,
         deltaY: null,
         isActive,
      };

      onInteract(glRef.current, mouseInfo);
      setMouseLocation(location);
   };

   const handleMouseLeave = () => setIsActive(false);

   const handleScroll = (event: any) => {
      event.preventDefault();
      const location = { x: event.clientX, y: event.clientY };
      const mouseInfo = {
         clickLocation,
         mouseLocation: location,
         lastMouseLocation: mouseLocation,
         deltaY: event.deltaY,
         isActive,
      };

      onInteract(glRef.current, mouseInfo);
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
      const { canvas } = glRef.current;
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

export { GL2Canvas };
