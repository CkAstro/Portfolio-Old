import { render, screen, container } from '@/test';
import { SketchCard, SketchItem } from '..';

jest.mock('@/hooks/useIsVisible');

interface MockStyle extends CSSStyleDeclaration {
   _values: any;
}
interface MockElement extends HTMLElement {
   style: MockStyle;
}
interface MockParent extends ParentNode {
   style: MockStyle;
}

describe('SketchItem (unit)', () => {
   test('renders', () => {
      const itemText = 'Test';
      const regex = new RegExp(`${itemText}$`);
      render(
         <SketchItem percent="10" itemDelay="1s">
            {itemText}
         </SketchItem>,
         container
      );
      expect(screen.getByText(regex)).toBeInTheDocument();
   });

   test('correct style properties', () => {
      const itemText = 'Test';
      const regex = new RegExp(`${itemText}$`);
      const width = '10';
      const delay = '1s';
      render(
         <SketchItem percent={width} itemDelay={delay}>
            {itemText}
         </SketchItem>,
         container
      );

      const item = screen.getByText(regex) as MockElement;
      expect(item.style._values['--width']).toEqual(`${width}%`);

      const parent = item.parentNode as ParentNode as MockParent;
      expect(parent.style._values['--item-delay']).toEqual(delay);
   });

   test('correct default delay', () => {
      const itemText = 'Test';
      const regex = new RegExp(`${itemText}$`);
      const width = '10';
      render(<SketchItem percent={width}>{itemText}</SketchItem>, container);

      const item = screen.getByText(regex) as MockElement;
      expect(item.style._values['--width']).toEqual(`${width}%`);

      const parent = item.parentNode as ParentNode as MockParent;
      expect(parent.style._values['--item-delay']).toEqual('0s');
   });
});

describe('SketchCard (unit)', () => {
   test('renders', () => {
      render(
         <SketchCard>
            <SketchItem percent="10">Test</SketchItem>
         </SketchCard>,
         container
      );

      expect(document.querySelector('.sketchCard')).toBeInTheDocument();
   });

   test('correct delay', () => {
      const delay = '1.5s';
      render(
         <SketchCard cardDelay={delay}>
            <SketchItem percent="10">Test</SketchItem>
         </SketchCard>,
         container
      );

      const item = document.querySelector('.sketchCard') as MockElement;
      expect(item.style._values['--card-delay']).toEqual(delay);
   });

   test('correct default delay', () => {
      render(
         <SketchCard>
            <SketchItem percent="10">Test</SketchItem>
         </SketchCard>,
         container
      );

      const item = document.querySelector('.sketchCard') as MockElement;
      expect(item.style._values['--card-delay']).toEqual('0s');
   });
});
