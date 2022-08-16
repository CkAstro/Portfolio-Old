import getNewSquares from '../getNewSquares';
import { nucleoChart } from '../nucleoChart';

// we test nucleoChart formatting separately, so we only test sizing here
jest.mock('../nucleoChart');

describe('getNewSquares', () => {
   test('build full chart', () => {
      const expectedSize = 98; // two excludes
      const squares = getNewSquares(nucleoChart, 10, 10);
      expect(squares.length).toEqual(expectedSize);
      const stableSquares = squares.filter((square) => square.props.stable);
      expect(stableSquares.length).toEqual(12);
   });

   test('build partial chart', () => {
      const expectedSize = 23; // two excludes in 5x5

      const squares = getNewSquares(nucleoChart, 5, 4); // extra column is drawn
      expect(squares.length).toEqual(expectedSize);

      // we cut off anything after '5' and anything before 'F' so only I and J isotopes
      const stableSquares = squares.filter((square) => square.props.stable);
      expect(stableSquares.length).toEqual(4);
   });
});
