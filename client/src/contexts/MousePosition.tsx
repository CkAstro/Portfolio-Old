import { useState, useContext, createContext, useMemo } from 'react';
import { MousePosition } from '@/types';

interface ProviderInterface {
   mousePosition: MousePosition;
   setMousePosition: React.Dispatch<React.SetStateAction<MousePosition>>;
}

const defaultPosition: MousePosition = {
   x: 200,
   y: window.innerHeight - 200,
   isActive: true, // required for 'useMeander' hook
};

const MousePositionContext = createContext<ProviderInterface | null>(null);

function MousePositionProvider({ children }: { children: React.ReactNode }) {
   const [mousePosition, setMousePosition] =
      useState<MousePosition>(defaultPosition);
   const mouse = useMemo(
      () => ({ mousePosition, setMousePosition }),
      [mousePosition]
   );

   return (
      <MousePositionContext.Provider value={mouse}>
         {children}
      </MousePositionContext.Provider>
   );
}

const useMousePosition = () => {
   const mouse = useContext(MousePositionContext);
   const { mousePosition, setMousePosition } = mouse as ProviderInterface;

   return {
      mousePosition,
      setMousePosition,
   };
};

export { MousePositionProvider, useMousePosition };
