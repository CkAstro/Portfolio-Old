import { useState } from 'react';
import css from './Style2.module.css';

interface LayerProps {
   hasMouseOver: boolean;
   items: React.ReactNode;
}

const DefaultLayer = ({ hasMouseOver, items }: LayerProps) => (
   <div
      className={`${css.buttonContainer__default} ${
         hasMouseOver ? css.mouseOver : ''
      }`}
   >
      {items}
   </div>
);

const Layer1 = ({ hasMouseOver, items }: LayerProps) => (
   <div
      className={`${css.buttonContainer__layer1} ${
         hasMouseOver ? css.mouseOver : ''
      }`}
   >
      {items}
   </div>
);

const Layer1Cover = ({ hasMouseOver, items }: LayerProps) => (
   <div
      className={`${css['buttonContainer__layer1-cover']} ${
         hasMouseOver ? css.mouseOver : ''
      }`}
   >
      {items}
   </div>
);

const Layer2 = ({ hasMouseOver, items }: LayerProps) => (
   <div
      className={`${css.buttonContainer__layer2} ${
         hasMouseOver ? css.mouseOver : ''
      }`}
   >
      {items}
   </div>
);

interface Props {
   children: React.ReactNode;
}

const Style2 = ({ children }: Props) => {
   const [hasMouseOver, setHasMouseOver] = useState<boolean>(false);

   const handleTouch = (event: any) => event.stopPropagation();

   return (
      <div
         className={css.buttonContainer}
         onMouseEnter={() => setHasMouseOver(true)}
         onMouseLeave={() => setHasMouseOver(false)}
         onTouchEnd={handleTouch}
      >
         <DefaultLayer hasMouseOver={hasMouseOver} items={children} />
         <Layer1 hasMouseOver={hasMouseOver} items={children} />
         <Layer1Cover hasMouseOver={hasMouseOver} items={children} />
         <Layer2 hasMouseOver={hasMouseOver} items={children} />
      </div>
   );
};

export { Style2 };
