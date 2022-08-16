import { useState, useContext, createContext, useMemo } from 'react';
import { Modal, ModalProps, ModalContent } from '@/types';

interface ProviderInterface {
   modalProps: ModalProps;
   setModalProps: React.Dispatch<React.SetStateAction<ModalProps>>;
}

const defaultProps = {
   content: [null],
   isActive: false,
   page: 0,
};

const ModalContext = createContext<ProviderInterface | null>(null);

function ModalProvider({ children }: { children: React.ReactNode }) {
   const [modalProps, setModalProps] = useState<ModalProps>(defaultProps);
   const modal = useMemo(() => ({ modalProps, setModalProps }), [modalProps]);

   return (
      <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
   );
}

const useModal = (): Modal => {
   const modal = useContext(ModalContext);
   const { modalProps, setModalProps } = modal as ProviderInterface;

   const setModalContent = (content: ModalContent) => {
      const updatedProps = {
         content,
         isActive: true,
         page: 0,
      };
      setModalProps(updatedProps);
   };

   const toNextPage = () => {
      const newPage = modalProps.page + 1;
      const updatedProps = {
         ...modalProps,
         page: newPage > modalProps.content.length - 1 ? 0 : newPage,
      };
      setModalProps(updatedProps);
   };

   const toPrevPage = () => {
      const newPage = modalProps.page - 1;
      const updatedProps = {
         ...modalProps,
         page: newPage < 0 ? modalProps.content.length - 1 : newPage,
      };
      setModalProps(updatedProps);
   };

   const clearModalContent = () => {
      const updatedProps = {
         ...modalProps,
         content: [null],
         isActive: false,
         page: 0,
      };
      setModalProps(updatedProps);
   };

   const closeModal = () => {
      const updatedProps = {
         ...modalProps,
         isActive: false,
      };
      setModalProps(updatedProps);
      // timer to clear content so modal size doesn't jump before disappear
      setTimeout(() => clearModalContent(), 200);
   };

   return {
      modalProps,
      setModalContent,
      toNextPage,
      toPrevPage,
      closeModal,
   };
};

export { ModalProvider, useModal };
