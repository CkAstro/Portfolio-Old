import css from './SketchCard.module.css';

interface Props {
   percent: string | number;
   itemDelay?: string;
   children: React.ReactNode;
}

const SketchItem = ({ percent, itemDelay, children }: Props) => (
   <div
      style={{ '--item-delay': itemDelay } as React.CSSProperties}
      className={css.sketchItem}
   >
      <div
         style={{ '--width': `${percent}%` } as React.CSSProperties}
         className={css.sketchItemBar}
      >
         {`${percent}% | `}
         {children}
      </div>
   </div>
);

SketchItem.defaultProps = { itemDelay: '0s' };

export { SketchItem };
