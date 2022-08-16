import { useRef } from 'react';
import { useIsVisible } from '@/hooks';
import css from './SketchCard.module.css';

interface Props {
   cardDelay?: string;
   children: React.ReactNode;
}

const SketchCard = ({ cardDelay, children }: Props) => {
   const divRef = useRef(null);
   const isVisible = useIsVisible(divRef, true);

   return (
      <div
         ref={divRef}
         style={{ '--card-delay': cardDelay } as React.CSSProperties}
         className={`${css.sketchCard} ${isVisible ? css.active : ''}`}
      >
         {children}
      </div>
   );
};

SketchCard.defaultProps = { cardDelay: '0s' };

export { SketchCard };
