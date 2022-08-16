import { ModalProps, Modal, ModalContent } from '@/types';

const defaultProps: ModalProps = {
   content: [null],
   isActive: false,
   page: 0,
};

const modalProps = { ...defaultProps };

const useModal = (): Modal => {
   const setModalContent = (content: ModalContent) => {
      modalProps.content = content;
   };

   const toNextPage = () => {
      const newPage = modalProps.page + 1;
      modalProps.page = newPage > modalProps.content.length - 1 ? 0 : newPage;
   };

   const toPrevPage = () => {
      const newPage = modalProps.page - 1;
      modalProps.page = newPage < 0 ? modalProps.content.length - 1 : newPage;
   };

   const clearModalContent = () => {
      modalProps.content = defaultProps.content;
      modalProps.isActive = defaultProps.isActive;
      modalProps.page = defaultProps.page;
   };

   const closeModal = () => {
      clearModalContent();
   };

   return {
      modalProps,
      setModalContent,
      toNextPage,
      toPrevPage,
      closeModal,
   };
};

export default { useModal };
export { useModal };
