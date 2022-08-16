import { NucleoElement } from '@/types';

const range = (start: number, end: number) => {
   let items: Array<number> = [];
   for (let i = start; i < end + 1; i++) {
      items = items.concat(i);
   }
   return items;
};

const nucleoChart: Array<NucleoElement> = [
   { element: 'A', isotopes: range(1, 10), stable: [1] },
   { element: 'B', isotopes: range(1, 10), stable: [2] },
   { element: 'C', isotopes: range(1, 10), stable: [3] },
   { element: 'D', isotopes: range(1, 10), stable: [4] },
   { element: 'E', isotopes: range(1, 10), stable: [5] },
   { element: 'F', isotopes: range(1, 10), stable: [6] },
   { element: 'G', isotopes: range(1, 10), stable: [7], exclude: [2] },
   { element: 'H', isotopes: range(1, 10), stable: [8], exclude: [3] },
   { element: 'I', isotopes: range(1, 10), stable: [1, 2] },
   { element: 'J', isotopes: range(1, 10), stable: [3, 4] },
];

export default nucleoChart;
export { range, nucleoChart };
