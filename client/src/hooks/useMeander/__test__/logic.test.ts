import { MousePosition } from '@/types';
import {
   getLocation,
   updateLocation,
   updateMousePosition,
   SquarePosition,
} from '../logic';

class MockDiv {
   top: number;
   left: number;
   height: number;

   constructor(top: number, left: number, height: number) {
      this.top = top;
      this.left = left;
      this.height = height;
   }

   getBoundingClientRect() {
      return { top: this.top, left: this.left, height: this.height };
   }
}

describe('getLocation', () => {
   test('basic input', () => {
      const mouse = { x: 50, y: 50, isActive: false };
      const top = 20;
      const left = 10;
      const height = 100;
      const div = new MockDiv(top, left, height);
      const size = 10;
      const location = getLocation(mouse, div, size);
      expect(location.row).toEqual((top + height - mouse.y) / size);
      expect(location.col).toEqual((mouse.x - left) / size);
   });

   test('no mouse', () => {
      const mouse = null as unknown as MousePosition;
      const top = 0;
      const left = 10;
      const height = 100;
      const div = new MockDiv(top, left, height);
      const size = 10;

      const err = new Error('Mouse object not recognized.');
      expect(() => getLocation(mouse, div, size)).toThrow(err);
   });

   test('no div', () => {
      const mouse = { x: 50, y: 50, isActive: false };
      const div = null;
      const size = 10;

      const err = new Error('div object does not exist');
      expect(() => getLocation(mouse, div, size)).toThrow(err);
   });

   test('invalid size', () => {
      const mouse = { x: 50, y: 50, isActive: false };
      const top = 0;
      const left = 10;
      const height = 100;
      const div = new MockDiv(top, left, height);

      const err = new Error('size does not exist or is invalid.');
      expect(() =>
         getLocation(mouse, div, '3.2' as unknown as number)
      ).not.toThrow(err);
      expect(() =>
         getLocation(mouse, div, '3.2a' as unknown as number)
      ).toThrow(err);
   });
});

describe('updateLocation', () => {
   test('basic input', () => {
      const currentSquare = { row: 2, col: 2 };
      const mouse: MousePosition = { x: 50, y: 50, isActive: true };

      const location = updateLocation(currentSquare, mouse);
      expect(Object.keys(location)).toContain('row');
      expect(Object.keys(location)).toContain('col');
      expect(location).not.toEqual(currentSquare);
   });

   test('out of bounds', () => {
      window.innerWidth = 100;
      const currentSquare = { row: 2, col: 2 };
      const mouse: MousePosition = { x: 500, y: 50, isActive: true };

      const location = updateLocation(currentSquare, mouse);
      expect(location.row).toEqual(1.25);
      expect(location.col).toBeLessThan(3.5);
      expect(location.col).toBeGreaterThan(0.5);
   });

   test('invalid currentSquare', () => {
      const currentSquare = { row: 2 } as unknown as SquarePosition;
      const mouse: MousePosition = { x: 50, y: 50, isActive: true };

      const err = new Error('currentSquare object not recognized.');
      expect(() => updateLocation(currentSquare, mouse)).toThrow(err);
   });

   test('invalid mouse', () => {
      const currentSquare: SquarePosition = { row: 2, col: 2 };
      const mouse = { xloc: 50, yloc: 50 } as unknown as MousePosition;

      const err = new Error('Mouse object not recognized.');
      expect(() => updateLocation(currentSquare, mouse)).toThrow(err);
   });
});

describe('updateMousePosition', () => {
   test('basic input', () => {
      const square = { row: 3, col: 3.2 };
      const top = 20;
      const left = 10;
      const height = 100;
      const div = new MockDiv(top, left, height);
      const size = 10;

      const newMousePosition = updateMousePosition(square, div, size);
      expect(newMousePosition.x).toEqual(left + square.col * size);
      expect(newMousePosition.y).toEqual(top + height - square.row * size);
      expect(newMousePosition.isActive).toEqual(false);
   });

   test('invalid square', () => {
      const square = { row: 3, c: 3.2 } as unknown as SquarePosition;
      const top = 20;
      const left = 10;
      const height = 100;
      const div = new MockDiv(top, left, height);
      const size = 10;

      const err = new Error('square object not recognized.');
      expect(() => updateMousePosition(square, div, size)).toThrow(err);
   });

   test('invalid div', () => {
      const square = { row: 3, col: 3.2 };
      const div = null;
      const size = 10;

      const err = new Error('div object does not exist');
      expect(() => updateMousePosition(square, div, size)).toThrow(err);
   });

   test('invalid size', () => {
      const square = { row: 3, col: 3.2 };
      const top = 20;
      const left = 10;
      const height = 100;
      const div = new MockDiv(top, left, height);

      const err = new Error('size does not exist or is invalid.');
      expect(() => updateMousePosition(square, div, 'test' as unknown as number)).toThrow(err);
      expect(() => updateMousePosition(square, div, '3.2' as unknown as number)).not.toThrow(err);
      expect(() => updateMousePosition(square, div, 3.2)).not.toThrow(err);
   });
});
