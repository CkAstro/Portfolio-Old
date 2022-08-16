import { useEffect, useRef } from 'react';
import { useModal } from '@/contexts';
import { Modal } from '@/types';
import css from './ContentModal.module.css';

const ContentModal = () => {
   const divRef = useRef<any>(null);
   const { modalProps, toNextPage, toPrevPage, closeModal } =
      useModal() as Modal;

   useEffect(() => {
      if (!divRef.current) return;
      divRef.current.scrollTop = 0;
   }, [modalProps]);

   const handleClick = (event: any) => event.stopPropagation();
   const handleClose = () => closeModal();

   return (
      <div
         className={`${css.modal} ${modalProps.isActive ? css.active : ''}`}
         onClick={handleClose}
      >
         <div className={css.modal__container} onClick={handleClick}>
            <div ref={divRef} className={css.modal__content}>
               {modalProps.content && modalProps.content[modalProps.page]
                  ? modalProps.content[modalProps.page]
                  : null}
            </div>
            <div className={css.modal__topBar}>
               <div className={css.modal__closeButton} onClick={handleClose}>
                  &times;
               </div>
            </div>
            <div className={css.modal__pageNumber}>{`${modalProps.page + 1} / ${
               modalProps.content ? modalProps.content.length : 1
            }`}</div>
            <div onClick={toNextPage} className={css.modal__nextButton}>
               &#x27A4;
            </div>
            <div onClick={toPrevPage} className={css.modal__prevButton}>
               &#x27A4;
            </div>
         </div>
      </div>
   );
};

export { ContentModal };
