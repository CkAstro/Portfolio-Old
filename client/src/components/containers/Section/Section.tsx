import { Element } from 'react-scroll';
import css from './Section.module.css';

interface Props {
   navId: string;
   style: React.CSSProperties;
   hasContent: boolean;
   children: React.ReactNode;
}

const Section = ({ navId, style, hasContent, children }: Props) => (
   <Element
      name={navId}
      id={navId.toLowerCase()}
      style={style}
      className={css.section}
   >
      <div
         className={hasContent ? css.section__content : css.section__noContent}
      >
         {children}
      </div>
   </Element>
);

export { Section };
