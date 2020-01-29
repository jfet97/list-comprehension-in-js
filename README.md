List Comprehension in JS
WIP

```js
import { Comprehension } from '../src/index';
import { range, rangeReversed } from '../src/range';

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

```
