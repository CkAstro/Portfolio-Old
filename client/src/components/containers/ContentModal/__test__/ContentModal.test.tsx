import { render, screen, userEvent, act, container } from '@/test';
import { ClusterItemProps } from '@/types';
import { ModalProvider, useModal } from '@/contexts';
import { ContentModal } from '..';

const MockComponent = ({ pages }: ClusterItemProps) => {
   const { setModalContent } = useModal();
   return <button type="button" onClick={() => setModalContent(pages)} />;
};

describe('ContentModal', () => {
   test('should be empty on init', () => {
      act(() => {
         render(
            <ModalProvider>
               <ContentModal />
            </ModalProvider>,
            container
         );
      });
      // search for any text
      expect(() => screen.getByText(/[a-zA-Z]+/)).toThrowError();
   });

   test('ensure content is added', async () => {
      const testText = 'test';
      const pages = [<div>{testText}</div>];
      act(() => {
         render(
            <ModalProvider>
               <ContentModal />
               <MockComponent
                  pages={pages}
                  title={''}
                  components={''}
                  image={undefined}
                  description={''}
               />
            </ModalProvider>,
            container
         );
      });

      // click on component
      await userEvent.click(screen.getByRole('button', { name: '' }));

      // search for text
      expect(() => screen.getByText(/[a-zA-Z]+/)).not.toThrowError();
      expect(screen.getByText(testText)).toBeInTheDocument();
   });

   test('ensure pages', async () => {
      const text1 = 'foo';
      const text2 = 'bar';
      const pages = [<div>{text1}</div>, <div>{text2}</div>];
      act(() => {
         render(
            <ModalProvider>
               <ContentModal />
               <MockComponent
                  pages={pages}
                  title={''}
                  components={''}
                  image={undefined}
                  description={''}
               />
            </ModalProvider>,
            container
         );
      });

      // click on component
      await userEvent.click(screen.getByRole('button', { name: '' }));

      // search for text
      expect(screen.getByText(text1)).toBeInTheDocument();
      expect(() => screen.getByText(text2)).toThrowError();

      // go to next page
      const nextButton = document.querySelector(
         'div.modal__nextButton'
      ) as Element;
      await userEvent.click(nextButton);

      // search for text
      expect(screen.getByText(text2)).toBeInTheDocument();
      expect(() => screen.getByText(text1)).toThrowError();
   });
});
