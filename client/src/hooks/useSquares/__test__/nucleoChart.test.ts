import { nucleoChart } from '../nucleoChart';

// testing structure of actual 'nucleoChart' NOT the mock
describe('nucleoChart', () => {
   test('chart formatting', () => {
      nucleoChart.forEach((element) => {
         expect(Object.keys(element)).toContain('element');
         expect(Object.keys(element)).toContain('isotopes');
         expect(Object.keys(element)).toContain('stable');
         expect(typeof element.element).toEqual('string');
         expect(typeof element.isotopes).toEqual('object');
         element.isotopes.forEach((isotope) => {
            expect(typeof isotope).toEqual('number');
         });
         expect(typeof element.stable).toEqual('object');
         element.stable.forEach((isotope) => {
            expect(typeof isotope).toEqual('number');
         });
      });
   });
});
