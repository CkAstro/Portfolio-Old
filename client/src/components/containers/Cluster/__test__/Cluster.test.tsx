import { DisplayProvider } from '@/contexts';
import { render, screen, userEvent, fireEvent, act, container } from '@/test';
import { ClusterItem } from '@/components/containers';
import { Cluster } from '..';

jest.mock('@/contexts/Modal');

const mockItemInfo1 = {
   title: 'mockItem1',
   components: 'test',
   image: null,
   description: 'test item 1',
   pages: [null],
};

const mockItemInfo2 = {
   title: 'mockItem2',
   components: 'test',
   image: null,
   description: 'test item 2',
   pages: [null],
};

describe('Cluster (unit)', () => {
   test('ensure render on empty', () => {
      render(<Cluster />, container);

      expect(document.querySelector('.cluster')).toBeInTheDocument();
   });

   test('ensure children render', () => {
      render(
         <DisplayProvider>
            <Cluster>
               <ClusterItem info={mockItemInfo1} />
               <ClusterItem info={mockItemInfo2} />
            </Cluster>
         </DisplayProvider>,
         container
      );

      expect(screen.getByText(mockItemInfo1.title)).toBeInTheDocument();
      expect(screen.getByText(mockItemInfo2.title)).toBeInTheDocument();
   });
});

describe('Cluster (ClusterItem Integration)', () => {
   // render same dom elements before each test
   // container will automatically unmount elements
   beforeEach(() => {
      render(
         <DisplayProvider>
            <Cluster>
               <ClusterItem info={mockItemInfo1} />
               <ClusterItem info={mockItemInfo2} />
            </Cluster>
         </DisplayProvider>,
         container
      );
   });

   test('mouseover with multiple clusterItems', async () => {
      // grab ClusterItems
      const items = document.querySelectorAll('.clusterItem__content');
      expect(items.length).toEqual(2);

      // ensure no mouseover
      expect(document.querySelector('.mouseOver')).toEqual(null);

      // hover over first and ensure correct mouseover
      let ind = 0;
      await userEvent.hover(screen.getByText(mockItemInfo1.title));
      const hoverItem1 = document.querySelector('.mouseOver') as Element;
      for (let i = 0; i < hoverItem1.children.length; i++) {
         expect(hoverItem1.children[i]).toEqual(items[ind].children[i]);
      }
      await userEvent.unhover(screen.getByText(mockItemInfo1.title));

      // hover over second and ensure correct mouseover
      ind = 1;
      await userEvent.hover(screen.getByText(mockItemInfo2.title));
      const hoverItem2 = document.querySelector('.mouseOver') as Element;
      for (let i = 0; i < hoverItem2.children.length; i++) {
         expect(hoverItem2.children[i]).toEqual(items[ind].children[i]);
      }
   });

   test('useDisplay should turn off other items on touchEnd', async () => {
      // grab ClusterItems
      const items = document.querySelectorAll('.clusterItem__content');
      expect(items.length).toEqual(2);

      // ensure no mouseover
      expect(document.querySelector('.mouseOver')).toEqual(null);

      // touch first and ensure correct mouseover
      let ind = 0;
      fireEvent.touchStart(items[ind]);
      fireEvent.touchEnd(items[ind]);
      const touchItem1 = document.querySelector('.mouseOver') as Element;
      for (let i = 0; i < touchItem1.children.length; i++) {
         expect(touchItem1.children[i]).toEqual(items[ind].children[i]);
      }

      // touch second and ensure correct mouseover
      ind = 1;
      fireEvent.touchStart(items[ind]);
      fireEvent.touchEnd(items[ind]);
      const touchItem2 = document.querySelector('.mouseOver') as Element;
      for (let i = 0; i < touchItem2.children.length; i++) {
         expect(touchItem2.children[i]).toEqual(items[ind].children[i]);
      }

      // ensure only one mouseover at end
      expect(document.querySelectorAll('.mouseOver').length).toEqual(1);
   });
});
