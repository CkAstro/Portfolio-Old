/* eslint-disable indent */
const cube = {
   vertices: [
      -1.0, -1.0,  1.0,    // front
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0, -1.0, -1.0,    // back
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,    // top
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,
      -1.0, -1.0, -1.0,    // bottom
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,
       1.0, -1.0, -1.0,    // right
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0, -1.0,    // left
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
   ],
   indices: [
      0,  1,  2,     0,  2,  3,    // front
      4,  5,  6,     4,  6,  7,    // back
      8,  9,  10,    8,  10, 11,   // top
      12, 13, 14,    12, 14, 15,   // bottom
      16, 17, 18,    16, 18, 19,   // right
      20, 21, 22,    20, 22, 23,   // left
   ],
}

export default cube;
export { cube }