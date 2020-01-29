import { Comprehension } from '../src/index';
import { range, rangeReversed } from '../src/range';

test('Runs without crashing', () => {
  new Comprehension();
});


const { Comprehension, range, take } = require("list-comprehension-in-js");

let allRightTrianglesWithEvenPerimeter = new Comprehension(
  (i, c1, c2) => ({ i, c1, c2 }),
  [
    () => range(1, Infinity),
    (i) => range(1, i - 1),
    (_, c1) => range(1, c1)
  ],
  [
    (i, c1, c2) => (i ** 2 == c1 ** 2 + c2 ** 2),
    (i, c1, c2) => ((i + c1 + c2) % 2 == 0),
  ]
);

for (const triangle of take(allRightTrianglesWithEvenPerimeter, 12, 10)) {
  console.log(`hyp: ${triangle.i}, c1: ${triangle.c1}, c2:${triangle.c2}`);
}

/*
let triangles = new Comprehension(
  (i, c1, c2) => ({ i, c1, c2 }),
  [
    () => range(1, 10),
    (i) => range(1, i - 1),
    (_, c1) => range(1, c1)
  ],
  [
    (i, c1, c2) => (i ** 2 == c1 ** 2 + c2 ** 2),
    (i, c1, c2) => (i + c1 + c2 == 24),
  ]
);

console.log(triangles.eval());

let multiplesOf17And13 = new Comprehension(
  x => x,
  [
    () => range(1, Infinity),
  ],
  [
    (x) => (x % 17 == 0),
    (x) => (x % 13 == 0),
  ]
)

let allRightTriangles = new Comprehension(
  (i, c1, c2) => ({ i, c1, c2 }),
  [
    () => range(1, Infinity),
    (i) => range(1, i - 1),
    (_, c1) => range(1, c1)
  ],
  [
    (i, c1, c2) => (i ** 2 == c1 ** 2 + c2 ** 2),
    (i, c1, c2) => ((i + c1 + c2) % 2 == 0),
  ]
);

// credo funzioni con qualsiasi iterabile, non solo range

*/