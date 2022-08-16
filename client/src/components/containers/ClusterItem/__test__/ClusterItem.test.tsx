import { DisplayProvider } from '@/contexts';
import { render, screen, userEvent, fireEvent, container, act } from '@/test';
import { ClusterItemProps } from '@/types';
import { ClusterItem } from '..';

jest.mock('@/contexts/Modal');

const mockItemInfo: ClusterItemProps = {
   title: 'mockItem',
   components: 'test',
   image: null,
   description: 'test item',
   pages: [null],
};

describe('ClusterItem', () => {
   // container automatically unmounts DOM elements
   beforeEach(() => {
      render(
         <DisplayProvider>
            <ClusterItem info={mockItemInfo} />
         </DisplayProvider>,
         container
      );
   });

   test('ensure render', () => {
      expect(
         screen.getByText(mockItemInfo.title as string)
      ).toBeInTheDocument();
      expect(screen.getByText(mockItemInfo.description)).toBeInTheDocument();
   });

   test('hover applies .mouseOver', async () => {
      const item = document.querySelector('.clusterItem__content') as Element;

      // init
      expect(document.querySelector('.mouseOver')).not.toBeInTheDocument();

      // hover
      await userEvent.hover(item);
      expect(document.querySelector('.mouseOver')).toBeInTheDocument();

      // end hover
      await userEvent.unhover(item);
      expect(document.querySelector('.mouseOver')).not.toBeInTheDocument();
   });

   test('touch applies .mouseOver', async () => {
      const item = document.querySelector('.clusterItem__content') as Element;

      // init
      expect(document.querySelector('.mouseOver')).not.toBeInTheDocument();

      // touch once
      fireEvent.touchStart(item);
      fireEvent.touchEnd(item);
      expect(document.querySelector('.mouseOver')).toBeInTheDocument();

      // touch a second time
      fireEvent.touchStart(item);
      fireEvent.touchEnd(item);
      expect(document.querySelector('.mouseOver')).not.toBeInTheDocument();
   });
});
