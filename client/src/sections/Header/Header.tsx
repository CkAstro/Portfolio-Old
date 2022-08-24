import { useMousePosition } from '@/contexts';
import NucleoDisplay from '@/components/NucleoDisplay';
import css from './Header.module.css';

export const Header = () => {
   const { setMousePosition } = useMousePosition();

   // capture mouse movement for spotlight and hover effects in NucleoDisplay
   const handleMouseMove = (event: any) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY, isActive: true });
   };

   return (
      <div onMouseMove={handleMouseMove}>
         <div className={`noselect ${css.headerContainer}`}>
            <h1>Christopher Kolb</h1>
            <h2>
               Full Stack Development{' '}
               <span style={{ fontWeight: '400' }}>+</span> Computational
               Astrophysics
            </h2>
         </div>
         <NucleoDisplay />
      </div>
   );
};
