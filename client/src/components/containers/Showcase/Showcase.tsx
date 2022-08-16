import { useRef } from 'react';
import { useModal } from '@/contexts';
import { AnimatedButton } from '@/components/elements';
import { useIsVisible } from '@/hooks';
import { ClusterItemInfo, Modal } from '@/types';
import css from './Showcase.module.css';

const Showcase = ({ info }: ClusterItemInfo) => {
   const { setModalContent } = useModal() as Modal;
   const divRef = useRef(null) as any;
   const isVisible = useIsVisible(divRef, true);

   const handleClick = () => setModalContent(info.pages);

   return (
      <div
         ref={divRef}
         className={`${css.showcaseContainer} ${isVisible ? css.active : ''}`}
      >
         <div className={css.showcaseImageContainer}>
            <img src={info.image} alt={info.description} />
         </div>
         <div className={css.showcaseContent}>
            <h1>{info.title}</h1>
            <h2>{info.components}</h2>
            <p>{info.description}</p>
            <div onClick={handleClick}>
               <AnimatedButton.Style1>Learn More</AnimatedButton.Style1>
            </div>
         </div>
      </div>
   );
};

export { Showcase };
