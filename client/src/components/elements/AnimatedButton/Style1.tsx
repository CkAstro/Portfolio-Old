import { useState } from 'react';
import css from './Style1.module.css';

interface Props {
   children: React.ReactNode;
}

const Style1 = ({ children }: Props) => {
   const [hasMouseOver, setHasMouseOver] = useState(false);

   const handleTouch = (event: any) => event.stopPropagation();

   return (
      <div
         className={`noselect ${css.buttonContainer}`}
         onMouseEnter={() => setHasMouseOver(true)}
         onMouseLeave={() => setHasMouseOver(false)}
         onTouchEnd={handleTouch}
      >
         <div
            className={`${css.normalButton1} ${
               hasMouseOver ? css.hover : null
            }`}
         >
            {children}
         </div>
         <div
            className={`${css.hoverButton1} ${hasMouseOver ? css.hover : null}`}
         >
            {children}
         </div>
      </div>
   );
};

export { Style1 };
