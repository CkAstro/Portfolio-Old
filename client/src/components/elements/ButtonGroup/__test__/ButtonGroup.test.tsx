import { render, screen, userEvent, container } from '@/test';
import { ButtonGroup } from '..';

describe('ButtonGroup', () => {
   test('without header', async () => {
      let testVal;
      const setter = (val: string | number) => {
         testVal = val;
      };
      const buttons = [
         { text: 'a', value: '1' },
         { text: 'b', value: '2' },
         { text: 'c', value: '3' },
         { text: 'd', value: '4' },
      ];
      render(
         <ButtonGroup value="1" setter={setter} buttons={buttons} />,
         container
      );

      // ensure no header div
      const buttonHeader = document.querySelector(
         'div.container__header'
      ) as Element;
      expect(buttonHeader).not.toBeInTheDocument();

      // ensure all buttons
      const buttonGroup = document.querySelector(
         'div.container__group'
      ) as Element;
      expect(buttonGroup.children.length).toEqual(buttons.length);
      buttons.forEach((button) => {
         expect(screen.getByText(button.text)).toBeInTheDocument();
      });

      // test setter
      await userEvent.click(screen.getByText('c'));
      expect(testVal).toEqual('3');
   });

   test('with header', async () => {
      let testVal;
      const setter = (val: number | string) => {
         testVal = val;
      };
      const buttons = [
         { text: 'a', value: '1' },
         { text: 'b', value: '2' },
         { text: 'c', value: '3' },
         { text: 'd', value: '4' },
      ];

      render(
         <ButtonGroup
            value="1"
            setter={setter}
            header="test header"
            buttons={buttons}
         />,
         container
      );

      // ensure header
      const buttonHeader = document.querySelector(
         'div.container__header'
      ) as Element;
      expect(buttonHeader).toBeInTheDocument();
      expect(screen.getByText('test header')).toBeInTheDocument();

      // ensure buttons
      const buttonGroup = document.querySelector(
         'div.container__group'
      ) as Element;
      expect(buttonGroup.children.length).toEqual(buttons.length);
      buttons.forEach((button) => {
         expect(screen.getByText(button.text)).toBeInTheDocument();
      });

      // test setter
      await userEvent.click(screen.getByText('b'));
      expect(testVal).toEqual('2');
   });
});
