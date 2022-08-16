import { useState, useEffect } from 'react';
import { useModal, useDisplay } from '@/contexts';
import { Display, Modal, ClusterItemInfo } from '@/types';
import { AnimatedButton } from '@/components/elements';
import css from './ClusterItem.module.css';

const ClusterItem = ({ info }: ClusterItemInfo) => {
   const [hasMouseOver, setHasMouseOver] = useState<boolean>(false);
   const { isEnabled, enableItem } = useDisplay() as Display;
   const { setModalContent } = useModal() as Modal;
   const [isDragged, setIsDragged] = useState<boolean>(false);

   useEffect(() => {
      if (isEnabled.id !== info.title) return setHasMouseOver(false);
      return setHasMouseOver(true);
   }, [isEnabled.id]);

   const handleTouchMove = () => setIsDragged(true);

   const handleTouchEnd = () => {
      if (isDragged) return setIsDragged(false);
      if (isEnabled.id === info.title) return enableItem(null);
      return enableItem(info.title);
   };

   const handleClick = (event: any) => {
      event.stopPropagation();
      setModalContent(info.pages);
   };

   return (
      <div
         className={`noselect ${css.clusterItem}`}
         onMouseEnter={() => setHasMouseOver(true)}
         onMouseLeave={() => setHasMouseOver(false)}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
      >
         <div
            className={`${css.clusterItem__content} ${
               hasMouseOver ? css.mouseOver : ''
            }`}
         >
            <img src={info.image} alt={info.description} />
            <div className={css.clusterItem__topContent}>
               <h1>{info.title}</h1>
               <h2>{info.components}</h2>
            </div>
            <div className={css.clusterItem__bottomContent}>
               <p>{info.description}</p>
               <div onClick={handleClick}>
                  <AnimatedButton.Style1>Learn More</AnimatedButton.Style1>
               </div>
            </div>
         </div>
      </div>
   );
};

export { ClusterItem };
