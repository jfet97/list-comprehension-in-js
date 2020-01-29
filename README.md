List Comprehension in JS

WIP

```js
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
```
